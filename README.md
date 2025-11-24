# Corplink Client

## 常见问题 (Troubleshooting)

**Error: `ENOSPC: no space left on device`**
如果遇到此错误，说明您的磁盘空间不足。Electron 打包需要较大的磁盘空间（建议预留 2GB 以上）。请清理磁盘后重试。

## 开发与构建 (Development & Build)

1. **安装依赖 (Install Dependencies)**
   ```bash
   npm install
   ```

2. **本地开发 (Development)**
   启动 React 页面和 Electron 窗口：
   ```bash
   npm run electron:dev
   ```

3. **打包 Windows 应用 (Build for Windows)**
   生成 .exe 安装包（输出目录在 `release/`）：
   ```bash
   npm run build:win
   ```
