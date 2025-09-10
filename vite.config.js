import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  let proxy = undefined

  try {
    if (env.VITE_WEBHOOK_URL) {
      const url = new URL(env.VITE_WEBHOOK_URL)
      const target = `${url.protocol}//${url.host}`
      const path = url.pathname
      proxy = {
        '/api/webhook': {
          target,
          changeOrigin: true,
          secure: true,
          rewrite: () => path,
        },
      }
    }
  } catch (e) {
    // ignore invalid URL during config
  }

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy,
    },
  }
})
