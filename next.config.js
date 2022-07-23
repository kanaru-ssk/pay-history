/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/data/:id*",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
