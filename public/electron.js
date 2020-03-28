'use strict'
const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

let w

const createWindow = () => {
  w = new BrowserWindow({ minWidth: 600, minHeight: 480 })
  w.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  isDev && w.webContents.openDevTools()
  w.on('closed', () => (w = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())

app.on('activate', () => w === null && createWindow())
