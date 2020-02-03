// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const DataStore = require('./renderer/MusicDataStore')

const MusicStore = new DataStore()

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      }
    }
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new AppWindow({}, './renderer/index.html')
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('init-tracks', MusicStore.getTracks())
  })

  // 添加音乐窗口功能
  ipcMain.on('add-music-window', (event, arg) => {
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    }, './renderer/add.html')
  })

  // 选择音乐交互功能
  ipcMain.on('select-music-window', async (event, arg) => {
    const { filePaths } = await dialog.showOpenDialog({ 
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Music', extensions: ['mp3'] },
      ] 
    })
    event.sender.send('selected-music-items', filePaths)
    // mainWindow.webContents.send('selected-music-items', 'filePaths')
  })

  // 持久化音乐文件
  ipcMain.on('import-music-window', (event, tracks) => {
    const updatedTracks = MusicStore.addTracks(tracks).getTracks()
    mainWindow.send('init-tracks', updatedTracks)
  })

  // 移除音乐
  ipcMain.on('remove-track', (event, id) => {
    const updatedTracks = MusicStore.removeTracks(id).getTracks()
    mainWindow.send('init-tracks', updatedTracks)
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
