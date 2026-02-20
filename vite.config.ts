import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  server: {
    proxy: {
      '/content': {
        target: 'https://blog.romanpeace.com',
        changeOrigin: true,
      },
    },
  },
})
