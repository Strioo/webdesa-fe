import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "api.qrserver.com", "192.168.18.3", "webdesa.dikadev.id"],
  },
  turbopack: {
    root: process.cwd(),
  },
  output: undefined, 
  distDir: '.next',
};

export default nextConfig;