import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3002,
      allowedHosts: true,
      cors: {
        origin: /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/
      },
      // hmr: {
      //   clientPort: 443,
      // }
      proxy: {
        // this path prefix can be anything, like '/discord'
        '/discord': {
          target: 'https://discord.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/discord/, ''),
        },
      },
    }
  }
})
