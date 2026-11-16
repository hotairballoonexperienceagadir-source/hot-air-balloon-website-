import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per-page Open Graph image generator (1200x630).
 * Usage: /api/og?t=<title>&s=<subtitle>  (URL-encoded)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("t") || "Hot Air Balloon Experience Morocco";
  const subtitle = searchParams.get("s") || "Marrakech - Agafay - Agadir - Atlas";
  const title = rawTitle.length > 95 ? rawTitle.slice(0, 92) + "..." : rawTitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #9A3412 100%)",
          padding: "72px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 72, background: "#C2410C", borderRadius: 16, border: "3px solid #D4A24C", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 22, height: 22, background: "#F5E6D3", borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 32, fontWeight: 700 }}>Hot Air Balloon</span>
            <span style={{ fontSize: 20, color: "#D4A24C", letterSpacing: 4 }}>EXPERIENCE MOROCCO</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 50, fontWeight: 700, lineHeight: 1.25 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#F5E6D3" }}>
          <span>{subtitle}</span>
          <span style={{ color: "#D4A24C" }}>hotairballoonexperienceagadir.com</span>
        </div>
      </div>
    ),
    size
  );
}
