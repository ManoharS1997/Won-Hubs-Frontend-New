import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: 'index.html',
  //       sw: './public/sw.js', //  service worker file
  //     },
  //     output: {
  //       entryFileNames: 'APIFetches.js',
  //     },
  //   },
  // },
  define: {
    global: {}, // ✅ Fix for "global is not defined"
  },

  server: {
    allowedHosts: ['wonhubs.com'],
    watch: {
      usePolling: true, // use this for flaky HMR
    },
    host: '0.0.0.0', // Bind to all network interfaces
    port: 5173,      // Ensure the port matches what you mapped in Docker
    hmr: true
  },
})
