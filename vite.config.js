import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Makes all asset paths relative, perfect for GitHub Pages
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        assistants: resolve(__dirname, 'assistants.html'),
        services: resolve(__dirname, 'services.html'),
        consultants: resolve(__dirname, 'consultants.html'),
      },
    },
  },
});
