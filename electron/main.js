const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// 设置应用名称
app.setName('Corplink');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false, // 无边框窗口
    resizable: false, // 禁止调整大小（符合截图固定尺寸）
    transparent: true, // 允许透明（如果需要圆角）
    backgroundColor: '#00000000', // 透明背景
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, '../public/icon.png') // 假设有图标，没有则忽略
  });

  // 开发环境加载 localhost，生产环境加载构建文件
  const isDev = !app.isPackaged;
  const startUrl = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  win.loadURL(startUrl);

  // IPC 监听：最小化
  ipcMain.on('window-minimize', () => {
    win.minimize();
  });

  // IPC 监听：关闭
  ipcMain.on('window-close', () => {
    win.close();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});