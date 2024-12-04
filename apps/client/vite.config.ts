import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return defineConfig({
        plugins: [react(), tsconfigPaths()],
        server: {
            port: parseInt(env.VITE_PORT as string),
        },
    });
};
