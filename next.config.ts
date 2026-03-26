import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: 'export',
  reactStrictMode: true,
};

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; img-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' wss:;",
          },
        ],
      },
    ];
  },
};
