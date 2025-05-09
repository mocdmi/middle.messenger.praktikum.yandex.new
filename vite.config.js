import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    preview: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@core': path.resolve(__dirname, './src/core'),
            '@helpers': path.resolve(__dirname, './src/helpers'),
            '@services': path.resolve(__dirname, './src/services'),
            '@api': path.resolve(__dirname, './src/api'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@const': path.resolve(__dirname, './src/const.ts'),
            '@types': path.resolve(__dirname, './src/types.ts')
        }
    }
});
