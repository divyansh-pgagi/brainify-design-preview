import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [36, 52, 80, 128, 160, 200, 260, 300],
  },
  compress: true,
};

export default nextConfig;
