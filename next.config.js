/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    domains: ['images.unsplash.com'],
  },
  // Environment variables that should be exposed to the browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_TALLY_FORM_ID: process.env.NEXT_PUBLIC_TALLY_FORM_ID,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    NEXT_PUBLIC_ENABLE_FEEDBACK: process.env.NEXT_PUBLIC_ENABLE_FEEDBACK,
  },
  // Optimizing for production
  poweredByHeader: false,
  // Optimize static file serving
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Only run this on the server side
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@sanity/vision': false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
