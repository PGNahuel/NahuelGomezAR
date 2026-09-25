import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(fileURLToPath(new URL('.', import.meta.url)), 'index.html')
      }
    }
  },
  base: '/'
})
