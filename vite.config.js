// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   define: {
//     'process.env': process.env
//   },
//   plugins: [react()],
//   build: {
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     }
//   } 
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://shankharapurmun.phnx.com.np',
        changeOrigin: true,
        secure: false,
      },
    }
  }
});