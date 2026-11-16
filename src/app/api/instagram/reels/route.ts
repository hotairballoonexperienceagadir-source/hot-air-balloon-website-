import { getReelsState } from "@/lib/instagram/reels-service";

/**
 * LIVE Instagram Reels feed for the Agadir homepage showcase.
 *
 * Returns the real TOP 4 reels of the official account ranked by verified
 * view count. The Instagram access token lives in the server environment
 * and is never part of this response. When the API is not configured the
 * route answers with a precise diagnostic (status + missing credentials +
 * setup requirements) instead of placeholder content.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const state = await getReelsState();
  return Response.json(state, { headers: { "Cache-Control": "no-store" } });
}
