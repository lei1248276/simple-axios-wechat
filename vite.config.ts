import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(process.cwd(), 'miniprogram/src/simpleAxios.ts'),
      name: 'SimpleAxios',
      formats: ['es']
    }
  }
})
