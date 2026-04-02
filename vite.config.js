import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const sharedHeaders = {
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin'
}

export default defineConfig({
  base: '/',
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    headers: sharedHeaders
  },
  preview: {
    headers: sharedHeaders
  }
})
