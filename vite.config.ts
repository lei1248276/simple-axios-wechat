import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'miniprogram/src/simpleAxios/index.ts'),
      name: 'SimpleAxios'
    }
  }
})
