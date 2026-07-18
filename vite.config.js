import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin()
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: `vantogo-bundle.js`,
        chunkFileNames: `vantogo-bundle.js`,
        assetFileNames: `vantogo-assets.[ext]`
      }
    }
  }
})
