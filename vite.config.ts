import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        id: 'keutamaan-shalawat-app',
        name: 'Keutamaan Shalawat ﷺ',
        short_name: 'Shalawat',
        description: 'Risalah Fadhilah, Khasiat, Adab, Hikayat, dan Untaian Syair Shalawat Nabi ﷺ',
        theme_color: '#064e3b',
        background_color: '#064e3b',
        display: 'standalone',
        display_override: ['standalone', 'window-controls-overlay'],
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        categories: ['books', 'education', 'lifestyle'],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,ttf,json}']
      }
    })
  ]
})
