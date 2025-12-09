import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    // Naikkan batas peringatan jadi 2MB (opsional, biar gak berisik)
    chunkSizeWarningLimit: 2000, 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Pisahkan @google/model-viewer menjadi file sendiri
            if (id.includes('@google/model-viewer')) {
              return 'model-viewer';
            }
            // Pisahkan Vue dan router menjadi file sendiri
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor';
            }
            // Sisa library lainnya masuk ke vendor
            return 'vendor';
          }
        }
      }
    }
  }
})