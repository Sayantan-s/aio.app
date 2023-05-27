import react from '@vitejs/plugin-react-swc';
import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: [
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
  server: {
    open: true,
    port: 3000,
    host: 'localhost',
    strictPort: true,
  },
  preview: {
    port: 8080,
    open: true,
  },
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
