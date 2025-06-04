/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
    },
    base: '/', // Make sure this is correct
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts', // Path to your setup file
        css: false, // Optional: if you don't need CSS processing in tests, it can speed them up
        testTimeout: 10000, // Increased global timeout to 10 seconds
    },
});
