import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import yaml from '@modyfi/vite-plugin-yaml'
import { resolve } from 'path'

// When deploying to GitHub Pages the site is served under /<repo-name>/.
// Set VITE_BASE env var in CI (e.g. VITE_BASE=/yaml-resume/) to match your repo name.
// Local dev always uses '/'.
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [vue(), tailwindcss(), yaml()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
