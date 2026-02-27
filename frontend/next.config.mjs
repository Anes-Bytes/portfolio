/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'anespy.ir' },
      { protocol: 'https', hostname: 'aness.ir' },
      { protocol: 'https', hostname: 'api.aness.ir' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
      { protocol: 'http', hostname: 'localhost', port: '8000' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.anespy.ir' }],
        destination: 'https://aness.ir/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'anespy.ir' }],
        destination: 'https://aness.ir/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.aness.ir' }],
        destination: 'https://aness.ir/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
