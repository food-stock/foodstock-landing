import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  //base: '/food-stock/foodstock-landing',
  publicDir: './src/assets',

})
