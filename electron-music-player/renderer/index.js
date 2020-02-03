const { ipcRenderer } = require('electron')
const { $, renderPlayerHTML, updateProgressHTML } = require('./helper')

let allTracks = null
let currentTrack = null
let musicAudio = new Audio()

$('add-music-btn').addEventListener('click', () => {
    ipcRenderer.send('add-music-window')
})

ipcRenderer.on('init-tracks', (e, tracks) => {
    allTracks = tracks
    renderHTML(tracks)
})

// 辅助方法
const renderHTML = (tracks) => {
    let musicHTML = tracks.reduce((html, track) => {
        return html + `<li class="row music-track list-group-item d-flex justify-content-between align-item-center">
            <div class="col-10">
                <i class="fas fa-music mr-2 text-secondary"></i>
                <b>${track.fileName}</b>
            </div>
            <div class="col-2">
                <i class="fas fa-play mr-3" data-id="${track.id}"></i>
                <i class="fas fa-trash-alt" data-id="${track.id}"></i>
            </div>
            </li>`
    }, '')
    const emptyHTML = '<div class="alert alert-warning" role="alert">冷清的一匹, 还不快去添加音乐 🎵~</div>'
    $('index-list').innerHTML = tracks.length > 0 ? `<ul class="list-group">${musicHTML}</ul>` : emptyHTML
}

// 事件冒泡代理的方式处理每个图标的点击事件 效率更高
$('index-list').addEventListener('click', (e) => {
    e.preventDefault()
    const { dataset, classList } = e.target
    const id = dataset && dataset.id
    if(id && classList.contains('fa-play')) {
        // 音乐播放逻辑
        if(currentTrack && currentTrack.id === id) {
            // 继续播放
            musicAudio.play()
        } else {
            // 播放其他 替换图标状态
            currentTrack = allTracks.find(track => track.id === id)
            musicAudio.src = currentTrack.path
            musicAudio.play()
            // 重置上一首图标
            const preEle = document.querySelector('.fa-pause')
            if(preEle) {
                preEle.classList.replace('fa-pause', 'fa-play')
            }
        } 
        classList.replace('fa-play', 'fa-pause')
    } else if(id && classList.contains('fa-pause')) {
        // 音乐暂停逻辑
        musicAudio.pause()
        classList.replace('fa-pause', 'fa-play')
    } else if(id && classList.contains('fa-trash-alt')) {
        // 音乐删除逻辑
        ipcRenderer.send('remove-track', id)
    }
})

// 监听音乐文件加载完成事件
musicAudio.addEventListener('loadedmetadata', () => {
    renderPlayerHTML(currentTrack.fileName, musicAudio.duration)
})
// 监听音乐进度事件
musicAudio.addEventListener('timeupdate', () => {
    updateProgressHTML(musicAudio.currentTime, musicAudio.duration)
})