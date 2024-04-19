import { app, BrowserWindow } from 'electron'
import path from 'node:path'
const express = require('express')

process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

const displayWindow = (port: integer) => {
  let win: BrowserWindow | null

  function createWindow() {
    win = new BrowserWindow({})
    win.setFullScreen(true)

    if (VITE_DEV_SERVER_URL) {
      win.loadURL(VITE_DEV_SERVER_URL)
    } else {
      win.loadURL(`http://localhost:${port}`)
    }
  }


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
      win = null
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  app.whenReady().then(createWindow)
}

const expressApp = express()
expressApp.use(express.static(RENDERER_DIST))
const server = expressApp.listen(0, () =>{
  const port = server.address().port
  console.log(`Server started on port ${port}`);
  displayWindow(port)
});
