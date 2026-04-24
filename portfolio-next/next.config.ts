import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "@react-three/drei"],
  },
  transpilePackages: ["three"],
};

export default config;
