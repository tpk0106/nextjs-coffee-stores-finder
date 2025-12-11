import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // hostname: "unsplash.com",
        //hostname: "plus.unsplash.com",
        port: "",
        // pathname: "/photo-**",
        //pathname: "/photo-1417325384643-aac51acc9e5d/**",
        // pathname: "/photos/**",
        //pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
