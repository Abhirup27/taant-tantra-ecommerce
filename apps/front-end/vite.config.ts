import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import { config, } from "common";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";

import type { Config } from 'common/dist/config/config';
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(config.FRONTEND_PORT)
  return {
    // plugins: [react(), tailwindcss()],
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    define: {
      __CONFIG__: JSON.stringify({
        FRONTEND_DOMAIN: config.FRONTEND_DOMAIN,
        FRONTEND_PORT: config.FRONTEND_PORT,
        FRONTEND_SSL: config.FRONTEND_SSL,
        BACKEND_DOMAIN: config.BACKEND_DOMAIN,
        BACKEND_PORT: config.BACKEND_PORT,
        BACKEND_SSL: config.BACKEND_SSL,
        // include only SAFE values!
      }),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: config.FRONTEND_PORT,
      allowedHosts: true,
      cors: {
        origin: /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/
      },
      // hmr: {
      //   clientPort: 443,
      // }
      // proxy: {
      //   // this path prefix can be anything, like '/discord'
      //   '/auth/signin': {
      //     target: 'http://www.localhost:3000',
      //     changeOrigin: true,
      //     secure: true,
      //     rewrite: (path) => path.replace(/^\/discord/, ''),
      //   },
      // },
    }
  }
})
