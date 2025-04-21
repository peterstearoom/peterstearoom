import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/'),
            handler: 'NetworkFirst'
          }
        ]
      },
      manifest: {
        name: "Peter's Tea Room",
        short_name: "TeaRoom",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4caf50",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
})
