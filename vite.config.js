import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@api", replacement: path.resolve(__dirname, "src/api") },
    ],
  },
  server: {
    open: true,
    port: 3000,
    host: "localhost",
    strictPort: true,
  },
  preview: {
    port: 8080,
    open: true,
  },
  build: {
    outDir: "build",
    minify: "esbuild",
  },
});
