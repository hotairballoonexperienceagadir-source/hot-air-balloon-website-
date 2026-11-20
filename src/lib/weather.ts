/**
 * LIVE balloon flight weather service (server side only).
 *
 * Provides the real weather data behind the 7 Day Balloon Flight Probability
 * widget shown on the Agadir homepage and the Marrakech page. Each city has
 * its own independent forecast, its own cache entry and its own coordinates:
 * the data of one city is never mixed with the other.
 *
 * DATA SOURCES, tried in order:
 *   1. Open-Meteo forecast API (primary, hourly values including gusts and
 *      the past three days for the history table).
 *   2. MET Norway locationforecast 2.0 (fallback, no API key required).
 *   3. 7Timer civil API (last resort, no API key required).
 *
 * All sources are normalised into one hourly series which is then aggregated
 * over the actual ballooning window of each morning (05:00 to 10:59 local
 * Africa/Casablanca time, when the flights really happen). The probability
 * score is an indicative estimate based on conservative thresholds; the final
 * go or no call always belongs to the pilot on the morning of the flight.
 *
 * CACHING: results are cached in server memory per city for 10 minutes, so
 * visitors never trigger an upstream request on every page view. If every
 * upstream source fails and a previous result exists, the stale result is
 * served with a stale flag instead of an error.
 */

export type WeatherCityId = "agadir" | "marrakech";

export type FlightStatus = "likely" | "uncertain" | "high_risk";

export interface ForecastDay {
  /** Local calendar date, e.g. "2026-11-18". */
  date: string;
  /** Maximum wind speed inside the flight window, km/h. */
  windKmh: number;
  /** Maximum wind gust inside the flight window, km/h, when the source provides it. */
  gustKmh: number | null;
  /** Mean temperature inside the flight window, degrees Celsius. */
  tempC: number;
  /** Mean relative humidity inside the flight window, percent. */
  humidityPct: number;
  /** Total precipitation inside the flight window, mm. */
  precipMm: number;
  /** Worst weather code observed inside the flight window (WMO style). */
  weatherCode: number;
  /** Human readable conditions, e.g. "Clear sky". */
  weatherLabel: string;
  /** Indicative flight probability score, 0 to 100. */
  score: number;
  /** Colour coded status derived from the score. */
  status: FlightStatus;
  /** Local sunrise time, e.g. "07:28", when the source provides it. */
  sunrise: string | null;
  /** True when this calendar day is today in the flight time zone. */
  isToday: boolean;
}

export interface ForecastPayload {
  city: WeatherCityId;
  cityName: string;
  area: string;
  /** UTC ISO timestamp of the last successful upstream fetch. */
  updatedAt: string;
  /** IANA time zone the forecast is aggregated in. */
  timezone: string;
  /** Name of the data source that answered, e.g. "Open-Meteo". */
  source: string;
  /** True when this is a previously cached result served after an upstream failure. */
  stale: boolean;
  /** The next 7 days, today first. */
  days: ForecastDay[];
  /** Up to 3 past days for the history table, may be empty. */
  history: ForecastDay[];
}

interface WeatherCityConfig {
  id: WeatherCityId;
  name: string;
  area: string;
  latitude: number;
  longitude: number;
}

/** Launch area coordinates of each destination, independent per city. */
export const weatherCities: Record<WeatherCityId, WeatherCityConfig> = {
  agadir: {
    id: "agadir",
    name: "Agadir",
    area: "Souss Valley launch area",
    latitude: 30.36,
    longitude: -9.34,
  },
  marrakech: {
    id: "marrakech",
    name: "Marrakech",
    /* Visible in the Live Outlook widget subtitle. Owner decision
     * 2026-11-20: no "Palmeraie" in visible Marrakech content. */
    area: "desert launch area",
    latitude: 31.66,
    longitude: -7.9,
  },
};

const FLIGHT_TIMEZONE = "Africa/Casablanca";
const WINDOW_START_HOUR = 5;
const WINDOW_END_HOUR = 10;
const FORECAST_DAYS = 7;
const HISTORY_DAYS = 3;
const CACHE_TTL_MS = 10 * 60 * 1000;
const FETCH_TIMEOUT_MS = 9000;

/* ------------------------------------------------------------------ */
/* WMO weather code helpers                                            */
/* ------------------------------------------------------------------ */

const WMO_LABELS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm",
};

function wmoLabel(code: number): string {
  return WMO_LABELS[code] ?? "Mixed conditions";
}

/** Higher means worse flying conditions. Used to keep the worst code of a day. */
function wmoSeverity(code: number): number {
  if (code === 99) return 12;
  if (code === 96) return 11;
  if (code === 95) return 10;
  if (code === 86 || code === 75) return 9;
  if ([67, 57, 82, 85, 77].includes(code)) return 8;
  if ([66, 56, 65, 73, 48, 45].includes(code)) return 7;
  if ([63, 81, 55, 71].includes(code)) return 5;
  if ([61, 80, 53].includes(code)) return 4;
  if (code === 51) return 2;
  if ([3, 2, 1, 0].includes(code)) return code;
  return 3;
}

/** Conservative score penalty per weather code, on top of the rain penalty. */
const WMO_PENALTY: Record<number, number> = {
  45: 22,
  48: 22,
  51: 4,
  53: 6,
  55: 10,
  56: 35,
  57: 40,
  61: 8,
  63: 14,
  65: 24,
  66: 40,
  67: 45,
  71: 45,
  73: 50,
  75: 55,
  77: 50,
  80: 8,
  81: 12,
  82: 20,
  85: 55,
  86: 60,
  95: 65,
  96: 70,
  99: 75,
};

/* ------------------------------------------------------------------ */
/* Shared normalised hourly series                                     */
/* ------------------------------------------------------------------ */

interface HourPoint {
  isoUtc: string;
  tempC: number | null;
  humidityPct: number | null;
  precipMm: number | null;
  windKmh: number | null;
  gustKmh: number | null;
  code: number | null;
}

interface NormalisedSeries {
  hours: HourPoint[];
  /** Map of local date to local sunrise string, e.g. "07:28". */
  sunriseByDate: Map<string, string>;
}

/** Resolves a UTC timestamp into the local date and hour of the flight time zone. */
const tzFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: FLIGHT_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  hourCycle: "h23",
});

function resolveLocal(isoUtc: string): { date: string; hour: number } {
  const parts = tzFormatter.formatToParts(new Date(isoUtc));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    hour: Number(get("hour")),
  };
}

function todayLocalDate(): string {
  const parts = tzFormatter.formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/* ------------------------------------------------------------------ */
/* Aggregation over the morning flight window                          */
/* ------------------------------------------------------------------ */

interface DayAggregate {
  date: string;
  windKmh: number;
  gustKmh: number | null;
  tempC: number;
  humidityPct: number;
  precipMm: number;
  code: number | null;
  sunrise: string | null;
}

function pickWindow(points: HourPoint[], date: string): HourPoint[] {
  const ofDate = points.filter((point) => resolveLocal(point.isoUtc).date === date);
  const inRange = (from: number, to: number) =>
    ofDate.filter((point) => {
      const hour = resolveLocal(point.isoUtc).hour;
      return hour >= from && hour <= to;
    });
  /* Preferred ballooning window, then a wider morning, then the whole day. */
  const preferred = inRange(WINDOW_START_HOUR, WINDOW_END_HOUR);
  if (preferred.length > 0) return preferred;
  const widened = inRange(WINDOW_START_HOUR - 1, WINDOW_END_HOUR + 2);
  if (widened.length > 0) return widened;
  return ofDate;
}

function aggregateDays(series: NormalisedSeries): DayAggregate[] {
  const byDate = new Map<string, HourPoint[]>();
  for (const point of series.hours) {
    const date = resolveLocal(point.isoUtc).date;
    const bucket = byDate.get(date);
    if (bucket) bucket.push(point);
    else byDate.set(date, [point]);
  }

  const aggregates: DayAggregate[] = [];
  for (const [date, ofDate] of byDate) {
    const window = pickWindow(series.hours, date);
    const numbers = (selector: (point: HourPoint) => number | null) =>
      window.map(selector).filter((value): value is number => value != null);

    const winds = numbers((point) => point.windKmh);
    const gusts = numbers((point) => point.gustKmh);
    const temps = numbers((point) => point.tempC);
    const humidities = numbers((point) => point.humidityPct);
    const precipitations = numbers((point) => point.precipMm);
    const codes = window
      .map((point) => point.code)
      .filter((value): value is number => value != null);

    const mean = (values: number[]) =>
      values.length > 0 ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
    const worst = (values: number[]) =>
      values.length > 0
        ? values.reduce((worst, code) => (wmoSeverity(code) >= wmoSeverity(worst) ? code : worst))
        : null;

    aggregates.push({
      date,
      windKmh: winds.length > 0 ? Math.max(...winds) : 0,
      gustKmh: gusts.length > 0 ? Math.max(...gusts) : null,
      tempC: Math.round(mean(temps)),
      humidityPct: Math.round(mean(humidities)),
      precipMm: Math.round(precipitations.reduce((sum, value) => sum + value, 0) * 10) / 10,
      code: worst(codes),
      sunrise: series.sunriseByDate.get(date) ?? null,
    });
  }

  return aggregates.sort((a, b) => a.date.localeCompare(b.date));
}

/* ------------------------------------------------------------------ */
/* Indicative scoring                                                  */
/* ------------------------------------------------------------------ */

function computeScore(aggregate: DayAggregate): { score: number; status: FlightStatus } {
  let penalty = 0;

  const wind = aggregate.windKmh;
  if (wind > 28) penalty += 45 + (wind - 28) * 3;
  else if (wind > 20) penalty += 12.5 + (wind - 20) * 3.5;
  else if (wind > 15) penalty += (wind - 15) * 2.5;

  if (aggregate.gustKmh != null) {
    const gust = aggregate.gustKmh;
    if (gust > 38) penalty += 12 + (gust - 38) * 2.2;
    else if (gust > 28) penalty += (gust - 28) * 1.2;
  }

  const precip = aggregate.precipMm;
  if (precip > 3) penalty += 55;
  else if (precip > 1) penalty += 30;
  else if (precip > 0.2) penalty += 12;

  if (aggregate.code != null) penalty += WMO_PENALTY[aggregate.code] ?? 0;

  if (aggregate.humidityPct >= 93) penalty += 8;
  else if (aggregate.humidityPct >= 85) penalty += 3;

  const score = Math.max(0, Math.min(100, Math.round(100 - penalty)));
  const status: FlightStatus = score >= 55 ? "likely" : score >= 35 ? "uncertain" : "high_risk";
  return { score, status };
}

function toForecastDay(aggregate: DayAggregate, today: string): ForecastDay {
  const { score, status } = computeScore(aggregate);
  return {
    date: aggregate.date,
    windKmh: aggregate.windKmh,
    gustKmh: aggregate.gustKmh,
    tempC: aggregate.tempC,
    humidityPct: aggregate.humidityPct,
    precipMm: aggregate.precipMm,
    weatherCode: aggregate.code ?? 3,
    weatherLabel: wmoLabel(aggregate.code ?? 3),
    score,
    status,
    sunrise: aggregate.sunrise,
    isToday: aggregate.date === today,
  };
}

/* ------------------------------------------------------------------ */
/* Source 1: Open-Meteo                                                */
/* ------------------------------------------------------------------ */

interface OpenMeteoResponse {
  error?: boolean;
  reason?: string;
  utc_offset_seconds: number;
  hourly: {
    time: string[];
    temperature_2m: (number | null)[];
    relative_humidity_2m: (number | null)[];
    precipitation: (number | null)[];
    weather_code: (number | null)[];
    wind_speed_10m: (number | null)[];
    wind_gusts_10m: (number | null)[];
  };
  daily: {
    time: string[];
    sunrise: (string | null)[];
  };
}

async function fetchOpenMeteo(city: WeatherCityConfig): Promise<NormalisedSeries> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(city.latitude));
  url.searchParams.set("longitude", String(city.longitude));
  url.searchParams.set(
    "hourly",
    "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_gusts_10m",
  );
  url.searchParams.set("daily", "sunrise");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("past_days", String(HISTORY_DAYS));
  url.searchParams.set("forecast_days", String(FORECAST_DAYS));
  url.searchParams.set("wind_speed_unit", "kmh");

  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Open-Meteo answered HTTP ${response.status}`);
  const data = (await response.json()) as OpenMeteoResponse;
  if (data.error) throw new Error(`Open-Meteo refused: ${data.reason ?? "unknown reason"}`);

  const offsetMs = data.utc_offset_seconds * 1000;
  const hours: HourPoint[] = data.hourly.time.map((localTime, index) => {
    /* Open-Meteo returns local times; convert to real UTC instants. */
    const utcMs = Date.parse(`${localTime}Z`) - offsetMs;
    return {
      isoUtc: new Date(utcMs).toISOString(),
      tempC: data.hourly.temperature_2m[index] ?? null,
      humidityPct: data.hourly.relative_humidity_2m[index] ?? null,
      precipMm: data.hourly.precipitation[index] ?? null,
      windKmh: data.hourly.wind_speed_10m[index] ?? null,
      gustKmh: data.hourly.wind_gusts_10m[index] ?? null,
      code: data.hourly.weather_code[index] ?? null,
    };
  });

  const sunriseByDate = new Map<string, string>();
  data.daily.time.forEach((date, index) => {
    const sunrise = data.daily.sunrise[index];
    if (sunrise) sunriseByDate.set(date, sunrise.slice(11));
  });

  return { hours, sunriseByDate };
}

/* ------------------------------------------------------------------ */
/* Source 2: MET Norway locationforecast 2.0                           */
/* ------------------------------------------------------------------ */

interface MetNoResponse {
  properties: {
    timeseries: {
      time: string;
      data: {
        instant: {
          details: {
            air_temperature?: number;
            relative_humidity?: number;
            wind_speed?: number;
            wind_speed_of_gust?: number;
          };
        };
        next_1_hours?: { details?: { precipitation_amount?: number } };
        next_6_hours?: { details?: { precipitation_amount?: number } };
      };
    }[];
  };
}

/** Maps a MET Norway symbol code to the closest WMO style code. */
function metNoSymbolToWmo(symbol: string): number {
  const clean = symbol.split("_").slice(0, -1).join("_") || symbol;
  if (clean.includes("thunder")) return 95;
  if (clean.includes("sleet")) return 66;
  if (clean.includes("snow")) return 73;
  if (clean.includes("fog")) return 45;
  if (clean.includes("heavyrain")) return 65;
  if (clean.includes("lightrain")) return 61;
  if (clean.includes("rain")) return 63;
  if (clean.includes("drizzle")) return 53;
  if (clean.includes("partlycloudy")) return 2;
  if (clean.includes("cloudy")) return 3;
  if (clean.includes("fair")) return 1;
  if (clean.includes("clearsky")) return 0;
  return 3;
}

async function fetchMetNo(city: WeatherCityConfig): Promise<NormalisedSeries> {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${city.latitude}&lon=${city.longitude}`;
  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    cache: "no-store",
    headers: {
      "User-Agent": "HotAirBalloonExperienceAgadir/1.0 weather widget",
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error(`MET Norway answered HTTP ${response.status}`);
  const data = (await response.json()) as MetNoResponse;

  /* Precipitation comes as 1 hour or 6 hour blocks: spread it onto hours. */
  const precipByHour = new Map<number, number>();
  const codeByHour = new Map<number, number>();
  const instants = new Map<
    number,
    { tempC: number | null; humidityPct: number | null; windKmh: number | null; gustKmh: number | null }
  >();

  for (const entry of data.properties.timeseries) {
    const timeMs = Date.parse(entry.time);
    const details = entry.data.instant.details;
    instants.set(timeMs, {
      tempC: details.air_temperature ?? null,
      humidityPct: details.relative_humidity ?? null,
      windKmh: details.wind_speed != null ? Math.round(details.wind_speed * 3.6 * 10) / 10 : null,
      gustKmh:
        details.wind_speed_of_gust != null
          ? Math.round(details.wind_speed_of_gust * 3.6 * 10) / 10
          : null,
    });
    const oneHour = entry.data.next_1_hours?.details?.precipitation_amount;
    const sixHours = entry.data.next_6_hours?.details?.precipitation_amount;
    if (oneHour != null) {
      precipByHour.set(timeMs, oneHour);
    } else if (sixHours != null) {
      for (let step = 0; step < 6; step += 1) {
        const hourMs = timeMs + step * 3600_000;
        precipByHour.set(hourMs, (precipByHour.get(hourMs) ?? 0) + sixHours / 6);
      }
    }
    const symbol =
      entry.data.next_1_hours?.summary?.symbol_code ??
      entry.data.next_6_hours?.summary?.symbol_code;
    if (symbol) codeByHour.set(timeMs, metNoSymbolToWmo(symbol));
  }

  const hours: HourPoint[] = [...instants.entries()]
    .sort(([a], [b]) => a - b)
    .map(([timeMs, details]) => ({
      isoUtc: new Date(timeMs).toISOString(),
      tempC: details.tempC,
      humidityPct: details.humidityPct,
      precipMm: Math.round((precipByHour.get(timeMs) ?? 0) * 100) / 100,
      windKmh: details.windKmh,
      gustKmh: details.gustKmh,
      code: codeByHour.get(timeMs) ?? null,
    }));

  return { hours, sunriseByDate: new Map() };
}

/* ------------------------------------------------------------------ */
/* Source 3: 7Timer civil                                              */
/* ------------------------------------------------------------------ */

interface SevenTimerResponse {
  init: string;
  dataseries: {
    timepoint: number;
    temp2m: number;
    rh2m?: string | number;
    wind10m: { direction: string; speed: number };
    prec_type: string;
    prec_amount: number;
    weather: string;
  }[];
}

/** Maps a 7Timer weather string to the closest WMO style code. */
function sevenTimerWeatherToWmo(weather: string): number {
  if (weather.includes("ts")) return 95;
  if (weather.includes("rainsnow")) return 66;
  if (weather.includes("snow")) return 73;
  if (weather.includes("fog")) return 45;
  if (weather.includes("vrain")) return 65;
  if (weather.includes("lightrain")) return 61;
  if (weather.includes("oshower")) return 81;
  if (weather.includes("ishower")) return 80;
  if (weather.includes("rain")) return 63;
  if (weather.includes("drizzle")) return 53;
  if (weather.includes("humid")) return 3;
  if (weather.includes("mcloudy") || weather.includes("cloudy")) return 3;
  if (weather.includes("pcloudy")) return 2;
  if (weather.includes("clear")) return 0;
  if (weather.includes("fair")) return 1;
  return 3;
}

async function fetchSevenTimer(city: WeatherCityConfig): Promise<NormalisedSeries> {
  const url = `https://www.7timer.info/bin/civil.php?lon=${city.longitude}&lat=${city.latitude}&ac=0&unit=metric&output=json&tzshift=0`;
  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`7Timer answered HTTP ${response.status}`);
  const data = (await response.json()) as SevenTimerResponse;

  const raw = data.init;
  const baseMs = Date.parse(
    `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}T${raw.slice(8, 10)}:00:00Z`,
  );
  if (Number.isNaN(baseMs)) throw new Error("7Timer returned an unreadable init time");

  const hours: HourPoint[] = data.dataseries.map((point) => {
    const humidity = typeof point.rh2m === "string" ? Number(point.rh2m.replace("%", "")) : point.rh2m;
    return {
      isoUtc: new Date(baseMs + point.timepoint * 3600_000).toISOString(),
      tempC: point.temp2m,
      humidityPct: Number.isNaN(humidity) ? null : humidity,
      precipMm: point.prec_type === "none" ? 0 : point.prec_amount,
      windKmh: Math.round(point.wind10m.speed * 3.6 * 10) / 10,
      /* 7Timer publishes no gust values: never invent one. */
      gustKmh: null,
      code: sevenTimerWeatherToWmo(point.weather),
    };
  });

  return { hours, sunriseByDate: new Map() };
}

/* ------------------------------------------------------------------ */
/* Build and cache                                                     */
/* ------------------------------------------------------------------ */

async function buildPayload(city: WeatherCityId, config: WeatherCityConfig): Promise<ForecastPayload> {
  const sources: { name: string; fetcher: (config: WeatherCityConfig) => Promise<NormalisedSeries> }[] = [
    { name: "Open-Meteo", fetcher: fetchOpenMeteo },
    { name: "MET Norway", fetcher: fetchMetNo },
    { name: "7Timer", fetcher: fetchSevenTimer },
  ];

  let lastError: unknown = null;
  for (const source of sources) {
    try {
      const series = await source.fetcher(config);
      if (series.hours.length === 0) throw new Error(`${source.name} returned no hourly data`);

      const today = todayLocalDate();
      const aggregates = aggregateDays(series);
      const days = aggregates
        .filter((aggregate) => aggregate.date >= today)
        .slice(0, FORECAST_DAYS)
        .map((aggregate) => toForecastDay(aggregate, today));
      const history = aggregates
        .filter((aggregate) => aggregate.date < today)
        .slice(-HISTORY_DAYS)
        .map((aggregate) => toForecastDay(aggregate, today));

      if (days.length === 0) throw new Error(`${source.name} returned no forecast days`);

      return {
        city,
        cityName: config.name,
        area: config.area,
        updatedAt: new Date().toISOString(),
        timezone: FLIGHT_TIMEZONE,
        source: source.name,
        stale: false,
        days,
        history,
      };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("All weather sources failed");
}

interface CacheEntry {
  payload: ForecastPayload;
  fetchedAt: number;
}

const cache = new Map<WeatherCityId, CacheEntry>();

/** Public entry point used by the API route. Never throws when a cache exists. */
export async function getForecast(city: WeatherCityId): Promise<ForecastPayload> {
  const config = weatherCities[city];
  if (!config) throw new Error(`Unknown weather city: ${city}`);

  const now = Date.now();
  const cached = cache.get(city);
  if (cached && now - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.payload;
  }

  try {
    const payload = await buildPayload(city, config);
    cache.set(city, { payload, fetchedAt: now });
    return payload;
  } catch (error) {
    if (cached) return { ...cached.payload, stale: true };
    throw error;
  }
}
