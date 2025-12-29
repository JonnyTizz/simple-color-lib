import { defineConfig } from 'tsdown'

export default defineConfig({
  exports: true, 
  entry: 'src/index.ts',
  dts: true,
  format: 'esm',
  minify: true,
})
