import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outputDir: 'types'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'miniprogram/src/simpleAxios/index.ts'),
      name: 'SimpleAxios',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
})
