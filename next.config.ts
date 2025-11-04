// import type { NextConfig } from "next";
//
// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };
//
// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com', // ดึง api ภายนอกมาใช้ ค่อยลบ
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;