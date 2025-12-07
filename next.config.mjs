/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly configure webpack and disable Turbopack
  webpack: (config, { isServer }) => {
    // Add any custom webpack configurations here if needed
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Add empty turbopack config to resolve build error
  turbopack: {},
  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  // Image optimization configuration
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [75, 80, 90, 95, 100],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
