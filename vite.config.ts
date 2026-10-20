import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['dhammacakka.svg'],
        manifest: {
          id: '/',
          name: 'Cânone Pali · Tipiṭaka Offline',
          short_name: 'Cânone Pali',
          description: 'Estudo do Cânone Pali em Português com base no Acesso ao Insight.',
          theme_color: '#0B0910',
          background_color: '#0B0910',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/dhammacakka.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
