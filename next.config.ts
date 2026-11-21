import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  /* The four language route groups each carry their own root layout, so the
   * global not found shell (src/app/global-not-found.tsx) provides the 404
   * document for every unknown URL. */
  experimental: {
    globalNotFound: true,
  },
  images: {
    /* Allow sharper-than-default delivery for the brand logo (quality={90}). */
    qualities: [75, 90],
    /* Google reviewer profile photos returned by the Places API. */
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  async headers() {
    return [
      {
        /* Brand photography and the painted logo are versioned by their
         * file names, so they can be cached for a very long time. */
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/", permanent: true },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
