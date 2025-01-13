/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // distDir: "build",
  trailingSlash: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN],
  },
  async redirects() {
    return [
      {
        source: '/index/',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
