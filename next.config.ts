import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
	protocol: "https",
	hostname: "dev-coe-workshop.s3.ap-southeast-2.amazonaws.com",
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/transactions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
