import { app, BrowserWindow } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'

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
  // Uncomment this line below and rebuild the file to open dev tools on start
  // isDev && win.webContents.openDevTools()
  win.on('closed', () => (win = null))
}

app.on('ready', createWindow)

app.on('ready', () => isDev && installExtension(REACT_DEVELOPER_TOOLS))

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())

app.on('activate', () => win === null && createWindow())
