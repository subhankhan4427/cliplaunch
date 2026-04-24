import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project Page: https://<user>.github.io/cliplaunch/
const base = process.env.GITHUB_ACTIONS === 'true' ? '/cliplaunch/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
