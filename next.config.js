/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sigmawire.net',
        pathname: '/i/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  transpilePackages: [
    '@trpc/server',
    '@trpc/client',
    '@trpc/react-query',
    '@tanstack/react-query',
    'next-auth',
    'superjson',
    'glob',
    'rimraf'
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-vercel-domain.vercel.app']
    }
  },
  webpack: (config, { isServer }) => {
    // Add any custom webpack config here
    return config
  }
}

module.exports = nextConfig 