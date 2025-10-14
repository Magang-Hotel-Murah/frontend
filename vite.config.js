import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      '@service' : path.resolve(__dirname, './src/service'),

      '@utils': path.resolve(__dirname, './src/utils'),
      
      '@hooks': path.resolve(__dirname, './src/hooks'),

      '@layouts': path.resolve(__dirname, './src/layouts'),
      
      '@components': path.resolve(__dirname, './src/components'),
      '@ui' : path.resolve(__dirname, './src/components/ui'),
      '@alert' : path.resolve(__dirname, './src/components/alert'),
      '@common' : path.resolve(__dirname, './src/components/common'),
      '@layout': path.resolve(__dirname, './src/components/layout'),

      '@pages': path.resolve(__dirname, './src/pages'),
      '@auth': path.resolve(__dirname, './src/pages/auth'),
      '@users' : path.resolve(__dirname, './src/pages/users'),
      '@settings' : path.resolve(__dirname, './src/pages/settings'),
      '@booking' : path.resolve(__dirname, './src/pages/bookings'),
      
      '@contentuser' : path.resolve(__dirname, './src/modules/user'),
      '@contentroom' : path.resolve(__dirname, './src/modules/bookings'),

    },
  },
})
