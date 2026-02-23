

/** @type {import('next').NextConfig} */

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