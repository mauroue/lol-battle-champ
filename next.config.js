/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    RIOT_API_KEY: 'RGAPI-f82fcc0a-f9ef-4476-a389-1394fb635147',
    UPDATE_CHAMPION_IDS: true
  }
}

module.exports = nextConfig
