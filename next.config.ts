import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wordpress-production-4042.up.railway.app",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "api.wa-ve.jp",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
