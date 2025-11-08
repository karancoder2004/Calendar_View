import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src') // ab @ se src folder ko refer kar sakte ho
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
