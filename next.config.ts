import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com", // ดึง api ภายนอกมาใช้ ค่อยลบ
        pathname: "/img/**",
      },
    ],
    unoptimized: true,
  },
  output: "export",
};

export default nextConfig;
