/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', "192.168.50.241"],
    },
}

module.exports = nextConfig
