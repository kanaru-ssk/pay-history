/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
  },
  async redirects() {
    return [
      {
        source: "/reset-password",
        destination: "/reset-password/send-link",
        permanent: true,
      },
    ];
  },
});

module.exports = nextConfig;
