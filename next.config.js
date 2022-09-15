/** @type {import('next').NextConfig} */

const withInterceptStdout = require("next-intercept-stdout");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withInterceptStdout(
  withPWA(
    {
      reactStrictMode: true,
      swcMinify: true,
      async redirects() {
        return [
          {
            source: "/reset-password",
            destination: "/reset-password/send-link",
            permanent: true,
          },
        ];
      },
    },
    (text) => (text.includes("Duplicate atom key") ? "" : text)
  )
);

module.exports = nextConfig;
