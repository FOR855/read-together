/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      config.devtool = "source-map"; // or 'cheap-module-source-map'
    }
    return config;
  },
};

export default nextConfig;
