import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 关键：确保 Electron 可以通过文件协议加载资源
  server: {
    port: 5173,       // 强制指定端口
    strictPort: true, // 若端口被占用则报错，不自动递增，防止 wait-on 脚本失效
    hmr: {
      overlay: false
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});