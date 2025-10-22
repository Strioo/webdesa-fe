import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Izinkan Next.js untuk load gambar dari domain berikut
    domains: ["localhost", "api.qrserver.com"],
  },
};

export default nextConfig;
