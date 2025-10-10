/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization
  images: {
    // Configure device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Configure image sizes for different resolutions
    qualities: [75, 80, 90, 95, 100],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Add remote image domains if you're loading images from external sources
    // domains: ['example.com', 'another-example.com'],
  },
  // Webpack configuration
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
  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default nextConfig;
