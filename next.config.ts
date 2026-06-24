import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site into ./out so it can be hosted on any static
  // host (Cloudflare Pages, GitHub Pages, Netlify Drop, etc.) with no server.
  output: "export",
  images: {
    // Static export has no image-optimization server, so serve images as-is.
    unoptimized: true,
  },
  compress: true,
};

export default nextConfig;
