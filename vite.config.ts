import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', '@mui/icons-material'],
    include: ['prop-types', 'react-is', '@mui/system', '@mui/material'],
  },
  resolve: {
    alias: {
      'prop-types': 'prop-types/prop-types.js',
      'react-is': 'react-is/cjs/react-is.development.js',
      '@mui/system/colorManipulator': path.resolve(__dirname, 'node_modules/@mui/system/colorManipulator.js'),
    },
  },
});