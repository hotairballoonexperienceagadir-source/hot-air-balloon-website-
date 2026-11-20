"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, ChartLine, Flame, RefreshCw, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ForecastDay, ForecastPayload, FlightStatus, WeatherCityId } from "@/lib/weather";

/**
 * LIVE 7 Day Balloon Flight Probability widget.
 *
 * Agadir homepage and Marrakech page each render their own instance with
 * their own city prop, so every page only ever shows its own forecast: the
 * data of Agadir and Marrakech is fetched and cached independently server
 * side and is never mixed.
 *
 * LIVE DATA POLICY: every percentage, temperature and wind value comes from
 * the Open-Meteo API (with MET Norway and 7Timer as automatic fallbacks) via
 * /api/flight-forecast. No hardcoded weather values, no fake percentages.
 * The score is an indicative estimate, the final flight approval always
 * belongs to the pilot on the morning of the flight.
 */

const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

const STATUS_META: Record<FlightStatus, { label: string; stroke: string; text: string }> = {
  likely: {
    label: "Likely",
    stroke: "#4ade80",
    text: "text-green-300",
  },
  uncertain: {
    label: "Uncertain",
    stroke: "#fbbf24",
    text: "text-amber-300",
  },
  high_risk: {
    label: "High Risk",
    stroke: "#f87171",
    text: "text-red-300",
  },
};

const SAFETY_DISCLAIMER =
  "Flight probability is an indicative weather estimate, not a flight guarantee. Final approval always depends on the pilot’s safety assessment.";

function weekdayLabel(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en", { weekday: "short" }).toUpperCase();
}

function dateLabel(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en", { month: "short", day: "numeric" });
}

function timeLabel(iso: string): string {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

export function FlightProbability({ city }: { city: WeatherCityId }) {
  const [data, setData] = useState<ForecastPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const response = await fetch(`/api/flight-forecast?city=${city}`, { cache: "no-store" });
      const payload = (await response.json()) as
        | ({ status: "ok" } & ForecastPayload)
        | { status: "error"; message: string };
      if (payload.status === "ok") {
        setData(payload);
        setError(null);
      } else {
        setError(payload.message);
      }
    } catch {
      setError("The live weather forecast is temporarily unavailable, please try again shortly.");
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  return (
    <section
      id="flight-forecast"
      aria-labelledby="flight-forecast-title"
      className="relative overflow-hidden bg-navy-950 py-16 md:py-24"
    >
      {/* Decorative sunrise glows on the night sky. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[44rem] max-w-full -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-96 rounded-full bg-gold-400/[0.06] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-56 w-80 rounded-full bg-brand-600/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-900/40">
            <span
              aria-hidden="true"
              className="relative flex h-2 w-2"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            Live Outlook
          </span>
          <h2
            id="flight-forecast-title"
            className="mt-5 text-3xl font-bold text-white text-balance md:text-5xl"
          >
            7-Day Balloon Flight Probability
          </h2>
          <p className="mt-3 text-sm text-white/60 md:text-base">
            {data ? `${data.cityName}, ${data.area}` : city === "agadir" ? "Agadir, Souss Valley launch area" : "Marrakech, desert launch area"} · Indicative scores, always confirm on flight morning
          </p>
          <p className="mt-1.5 text-xs text-white/40">
            An indicative estimate only, never a guarantee of flight availability. Final approval always belongs to the pilot.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          {loading && !data ? (
            <SkeletonRow />
          ) : error && !data ? (
            <ErrorBox message={error} onRetry={() => void load()} />
          ) : data ? (
            <>
              <ForecastRow days={data.days} />
              {data.stale && (
                <p className="mt-4 text-center text-xs text-amber-300">
                  Live refresh failed just now, showing the last successful update from {timeLabel(data.updatedAt)}.
                </p>
              )}
            </>
          ) : null}
        </div>

        {/* Elegant safety disclaimer below the 7 day forecast cards. */}
        <div className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-2.5 px-2 md:mt-8">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
          <p className="text-center text-xs leading-relaxed text-white/55 md:text-[13px]">
            {SAFETY_DISCLAIMER}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
          {data && <ForecastDialog data={data} />}
          <p aria-live="polite" className="text-xs text-white/45">
            {data
              ? `Updated ${timeLabel(data.updatedAt)} · Live data from ${data.source} · Refreshes automatically every 15 minutes`
              : "Connecting to the live weather service"}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

function ForecastRow({ days }: { days: ForecastDay[] }) {
  return (
    <ul className="scrollbar-none -mx-1 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-1 pb-2 pt-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible lg:grid-cols-7">
      {days.map((day) => (
        <DayCard key={day.date} day={day} />
      ))}
    </ul>
  );
}

function DayCard({ day }: { day: ForecastDay }) {
  const meta = STATUS_META[day.status];
  return (
    <li className="w-[56%] min-w-[176px] max-w-[230px] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink">
      <div
        className={`flex h-full flex-col rounded-2xl border bg-white/[0.045] p-3.5 transition duration-300 hover:-translate-y-1.5 hover:bg-white/[0.075] hover:shadow-2xl hover:shadow-black/50 ${
          day.isToday ? "border-brand-400/40 hover:border-brand-400/70" : "border-white/10 hover:border-white/25"
        }`}
      >
        <div className="flex items-center justify-between gap-1 text-[11px]">
          <span
            className={`font-semibold uppercase tracking-wider ${day.isToday ? "text-brand-400" : "text-white/55"}`}
          >
            {day.isToday ? "Today" : weekdayLabel(day.date)}
          </span>
          <span className="font-medium text-white/75">{dateLabel(day.date)}</span>
        </div>

        <div className="mt-3 flex justify-center">
          <ProbabilityRing score={day.score} status={day.status} />
        </div>

        <div className="mt-3 flex h-[30px] items-center justify-center">
          <p className="text-center text-[11px] leading-snug">
            <span className="text-white/55">Flight Conditions: </span>
            <span className={`font-bold ${meta.text}`}>{meta.label}</span>
          </p>
        </div>

        <div className="mt-3.5 grid grid-cols-3 gap-1.5">
          <StatBox value={String(Math.round(day.windKmh))} unit="km/h" label="Wind" />
          <StatBox value={String(day.tempC)} unit="°C" label="Temp" />
          <StatBox value={String(day.humidityPct)} unit="%" label="Hum" />
        </div>

        <p className="mt-2.5 text-center text-[10px] leading-relaxed text-white/45">
          Gusts {day.gustKmh != null ? `${Math.round(day.gustKmh)} km/h` : "N/A"} · Rain {day.precipMm.toFixed(1)} mm
        </p>
      </div>
    </li>
  );
}

function ProbabilityRing({ score, status }: { score: number; status: FlightStatus }) {
  const meta = STATUS_META[status];
  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setAnimated(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const offset = animated ? circumference * (1 - score / 100) : circumference;

  return (
    <svg
      viewBox="0 0 72 72"
      className="h-[68px] w-[68px] md:h-[72px] md:w-[72px]"
      role="img"
      aria-label={`Flight probability ${score} percent, ${meta.label}`}
    >
      <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="6.5" />
      <circle
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke={meta.stroke}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 36 36)"
        className="transition-[stroke-dashoffset] duration-1000 ease-out"
      />
      <text
        x="36"
        y="37"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={meta.stroke}
        fontSize="16"
        fontWeight="700"
        className="font-display"
      >
        {score}%
      </text>
    </svg>
  );
}

function StatBox({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="rounded-lg bg-white/[0.055] px-1 py-1.5 text-center">
      <div className="text-xs font-bold text-white">
        {value}
        <span className="ml-0.5 text-[9px] font-medium text-white/55">{unit}</span>
      </div>
      <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/45">{label}</div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <ul
      aria-hidden="true"
      className="scrollbar-none -mx-1 flex gap-3.5 overflow-hidden px-1 sm:grid sm:grid-cols-4 sm:gap-4 lg:grid-cols-7"
    >
      {[0, 1, 2, 3, 4, 5, 6].map((index) => (
        <li
          key={index}
          className="h-[236px] w-[56%] min-w-[176px] max-w-[230px] shrink-0 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04] sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink"
        />
      ))}
    </ul>
  );
}

function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.045] p-8 text-center">
      <AlertTriangle className="mx-auto h-8 w-8 text-amber-400" aria-hidden="true" />
      <p className="mt-4 text-sm leading-relaxed text-white/70">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition hover:border-brand-400/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Full forecast and history dialog                                    */
/* ------------------------------------------------------------------ */

function ForecastDialog({ data }: { data: ForecastPayload }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-medium text-white transition hover:border-brand-400/60 hover:bg-white/10 hover:shadow-lg hover:shadow-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          <ChartLine className="h-4 w-4 text-gold-400" aria-hidden="true" />
          Full Forecast &amp; History
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[86vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-navy-900 text-white sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white md:text-2xl">
            {data.cityName} Full Forecast &amp; History
          </DialogTitle>
          <DialogDescription className="text-sm text-white/60">
            {data.cityName}, {data.area} · Live data from {data.source}, updated {timeLabel(data.updatedAt)}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/55">The next 7 days</h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
              <ForecastTable days={data.days} />
            </div>
          </section>

          {data.history.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/55">
                Recent history, last {data.history.length} days
              </h3>
              <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
                <ForecastTable days={data.history} recorded />
              </div>
            </section>
          )}

          {/* Safety disclaimer inside the dialog. */}
          <div className="flex items-start gap-3 rounded-xl border border-gold-400/25 bg-gold-400/[0.08] p-4">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-white/80 md:text-[13px]">{SAFETY_DISCLAIMER}</p>
          </div>

          <section className="rounded-xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
            <h3 className="text-sm font-bold text-white">How the score is calculated</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-white/65">
              <li>Measured over the real ballooning window of each morning, 05:00 to 11:00 local time.</li>
              <li>Wind of 15 km/h or less and gusts of 28 km/h or less score full marks.</li>
              <li>Rain, storms and fog strongly reduce the score, exactly as they ground the balloons.</li>
              <li>From 55 the morning is Likely, from 35 it is Uncertain, below 35 it is High Risk.</li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-white/45">
              Flight probability is an indicative estimate computed from public forecast data, never a
              guarantee of flight availability. Weather can change fast and the final flight approval
              always belongs to your licensed pilot on the morning of the flight.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ForecastTable({ days, recorded = false }: { days: ForecastDay[]; recorded?: boolean }) {
  return (
    <table className="w-full min-w-[640px] text-sm">
      <caption className="sr-only">
        {recorded ? "Recorded past days" : "The next seven days"} with flight probability, wind, gusts,
        temperature, humidity and rain
      </caption>
      <thead>
        <tr className="bg-white/[0.06] text-left text-[10px] uppercase tracking-wider text-white/50">
          <th scope="col" className="px-3 py-2.5 font-semibold">Day</th>
          <th scope="col" className="px-3 py-2.5 font-semibold">Score</th>
          <th scope="col" className="px-3 py-2.5 font-semibold">Conditions</th>
          <th scope="col" className="px-3 py-2.5 font-semibold">Wind</th>
          <th scope="col" className="px-3 py-2.5 font-semibold">Gusts</th>
          <th scope="col" className="px-3 py-2.5 font-semibold">Temp</th>
          <th scope="col" className="px-3 py-2.5 font-semibold">Humidity</th>
          <th scope="col" className="px-3 py-2.5 font-semibold">Rain</th>
          <th scope="col" className="px-3 py-2.5 font-semibold">Sunrise</th>
        </tr>
      </thead>
      <tbody>
        {days.map((day) => (
          <tr key={day.date} className="border-t border-white/5 text-white/80">
            <th scope="row" className="whitespace-nowrap px-3 py-2.5 text-left font-semibold text-white">
              {dateLabel(day.date)}
              <span className="ml-1.5 text-[10px] font-medium uppercase tracking-wide text-white/45">
                {recorded ? "recorded" : day.isToday ? "today" : weekdayLabel(day.date)}
              </span>
            </th>
            <td className="whitespace-nowrap px-3 py-2.5">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: STATUS_META[day.status].stroke }}
                />
                <span className="font-bold" style={{ color: STATUS_META[day.status].stroke }}>
                  {day.score}%
                </span>
                <span className="text-xs text-white/50">{STATUS_META[day.status].label}</span>
              </span>
            </td>
            <td className="px-3 py-2.5 text-white/65">{day.weatherLabel}</td>
            <td className="whitespace-nowrap px-3 py-2.5">{Math.round(day.windKmh)} km/h</td>
            <td className="whitespace-nowrap px-3 py-2.5">
              {day.gustKmh != null ? `${Math.round(day.gustKmh)} km/h` : "N/A"}
            </td>
            <td className="whitespace-nowrap px-3 py-2.5">{day.tempC} °C</td>
            <td className="whitespace-nowrap px-3 py-2.5">{day.humidityPct}%</td>
            <td className="whitespace-nowrap px-3 py-2.5">{day.precipMm.toFixed(1)} mm</td>
            <td className="whitespace-nowrap px-3 py-2.5 text-white/55">{day.sunrise ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
