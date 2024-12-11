/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/meucard',
  assetPrefix: '/meucard',
}

module.exports = nextConfig 