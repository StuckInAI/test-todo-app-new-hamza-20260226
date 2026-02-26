module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['typeorm', 'sqlite3', 'reflect-metadata']
  }
}