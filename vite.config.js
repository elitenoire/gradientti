import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/gradientti/',
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'prismjs',
            {
              languages: ['css'],
              plugins: ['line-numbers', 'normalize-whitespace'],
              theme: 'prism-themes/duotone-dark',
              css: true,
            },
          ],
        ],
      },
    }),
  ],
})
