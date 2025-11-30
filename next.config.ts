import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com", // ดึง api ภายนอกมาใช้ ค่อยลบ
        pathname: "/img/**",
      },
    ],
  },
  output: "export",
  basePath: "/borrower",
};

export default nextConfig;
