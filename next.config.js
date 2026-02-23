/** @type {import('next').NextConfig} */

DATABASE_URL_UNPOOLED="postgresql://neondb_owner:npg_uzJ7d3PtZMVW@ep-shy-sun-a1iturt3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
const nextConfig = {
  images: {
    domains: [
      'pub-4e45315c538e47b780a62420f838d5bb.r2.dev', // Cloudflare R2 bucket domain
      'lh3.googleusercontent.com', 
      'pub-f4fdbbb171c94d718b10049bea9697ee.r2.dev'// For Google OAuth profile pictures
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 