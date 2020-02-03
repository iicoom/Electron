const { ipcRenderer } = require('electron')
const path = require('path')
const { $ } = require('./helper')

$('select-music-btn').addEventListener('click', () => {
    ipcRenderer.send('select-music-window')
})

let musicItemsPath = []
$('import-music-btn').addEventListener('click', () => {
    console.log('musicItemsPath', musicItemsPath)
    ipcRenderer.send('import-music-window', musicItemsPath)
})

ipcRenderer.on('selected-music-items', (event, filePaths) => {
    if (Array.isArray(filePaths)) {
        renderHTML(filePaths)
    }
})

// 辅助方法
const renderHTML = (pathArr) => {
    let musicHTML = pathArr.reduce((html, item) => html + `<li class="list-group-item">${path.basename(item)}</li>`, '')
    $('music-list').innerHTML = `<ul class="list-group">${musicHTML}</ul>`
    musicItemsPath = pathArr
}