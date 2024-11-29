import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    env: {
        BACK_URL: 'https://api.cloudcanvas.kro.kr',
    },
};

export default nextConfig;
