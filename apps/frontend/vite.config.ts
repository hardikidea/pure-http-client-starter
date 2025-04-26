import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { viteMockServe } from 'vite-plugin-mock'; // Optional if you're using mock data

// Vite configuration with Vitest setup
export default defineConfig({
  plugins: [react()],
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: './src/setupTests.ts', // path to your setup file
  // },
});
