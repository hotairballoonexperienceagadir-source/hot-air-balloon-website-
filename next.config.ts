import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: {
    /* Allow sharper-than-default delivery for the brand logo (quality={90}). */
    qualities: [75, 90],
    /* Google reviewer profile photos returned by the Places API. */
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
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
