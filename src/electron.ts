import { app, BrowserWindow } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

let win: BrowserWindow | null = null

const createWindow = () => {
  win = new BrowserWindow({
    minWidth: 600,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  isDev && win.webContents.openDevTools()
  win.on('closed', () => (win = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())

app.on('activate', () => win === null && createWindow())

