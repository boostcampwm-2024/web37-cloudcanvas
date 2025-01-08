import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    env: {
        BACK_URL: process.env.BACK_URL ?? 'http://localhost:3000',
    },
};

export default nextConfig;
