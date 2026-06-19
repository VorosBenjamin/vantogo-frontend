import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `vantogo-bundle.js`,
        chunkFileNames: `vantogo-bundle.js`,
        assetFileNames: `vantogo-assets.[ext]`
      }
    }
  }
})
