
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
      {
       protocol: "https", 
      hostname: "i.scdn.co"  // ดึง api ภายนอกมาใช้ ค่อยลบ
      }
    ],
  },
};

export default nextConfig;
