import { getForecast, weatherCities, type WeatherCityId } from "@/lib/weather";

/**
 * Live 7 day balloon flight forecast for the widget.
 *
 * GET /api/flight-forecast?city=agadir     -> Agadir Souss Valley forecast
 * GET /api/flight-forecast?city=marrakech  -> Marrakech Palmeraie forecast
 *
 * The heavy lifting and the 10 minute cache live in src/lib/weather.ts so
 * visitors never trigger an upstream request on every page view. Both cities
 * are fetched and cached independently and are never mixed.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cityParam = new URL(request.url).searchParams.get("city");

  if (cityParam !== "agadir" && cityParam !== "marrakech") {
    return Response.json(
      {
        status: "error",
        message: "Unknown city, use city=agadir or city=marrakech.",
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const forecast = await getForecast(cityParam satisfies WeatherCityId);
    return Response.json(
      { status: "ok", ...forecast },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      {
        status: "error",
        message: "The live weather forecast is temporarily unavailable, please try again shortly.",
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
