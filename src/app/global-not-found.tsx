import Link from "next/link";

/**
 * GLOBAL not found shell (Next.js global-not-found).
 *
 * With four language route groups there is no single root layout, so the
 * global not found file provides its own full HTML document for every
 * unknown URL. It uses the English shell (the default language of the
 * site) with the real fonts, the real background colors and a link back to
 * the homepage.
 *
 * Requires experimental.globalNotFound in next.config.ts.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            backgroundColor: "#0a1626",
            color: "#f5efe0",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            padding: "24px",
          }}
        >
          <p style={{ fontSize: "64px", fontWeight: 700, margin: 0, color: "#e8a33d" }}>404</p>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
            This page could not be found.
          </h1>
          <p style={{ margin: 0, opacity: 0.75 }}>
            The page you are looking for does not exist or has moved.
          </p>
          <Link
            href="/"
            style={{
              marginTop: "12px",
              display: "inline-block",
              borderRadius: "9999px",
              backgroundColor: "#e8871e",
              color: "#ffffff",
              fontWeight: 700,
              padding: "12px 28px",
              textDecoration: "none",
            }}
          >
            Back to the homepage
          </Link>
        </main>
      </body>
    </html>
  );
}
