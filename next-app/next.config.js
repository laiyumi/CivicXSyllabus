/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    },
    images: {
        domains: ['i0.wp.com', 'res.cloudinary.com', 'images.squarespace-cdn.com'],
    },
    env: {
        NEXTAUTH_URL: process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000",
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
}

module.exports = nextConfig
