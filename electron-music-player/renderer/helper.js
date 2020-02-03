/**
 * DOM id选择器
 * @param {Dom 元素id} id 
 */
const $ = (id) => document.getElementById(id)

/**
 * 播放器渲染
 * @param {当前播放歌曲名} name 
 * @param {音乐时长} duration 
 */
const renderPlayerHTML = (name, duration) => {
    const html = `<div class="col font-weight-bold">正在播放 ${name}</div>
    <div class="col">
        <span id="current-seeker">00:00</span> / ${formatCurTime(duration)}
    </div>`
    $('player-status').innerHTML = html
}

/**
 * 歌曲时间渲染
 * @param {当前播放时间} currentTime 
 */
const updateProgressHTML = (currentTime, duration) => {
    $('current-seeker').innerHTML = formatCurTime(currentTime)
    // 进度条
    let progress = Math.floor(currentTime/duration * 100) + '%'
    $('music-progress-bar').innerHTML = progress
    $('music-progress-bar').style.width = progress
}

/**
 * 格式化时间
 * @param {当前时间 秒} currentTime 
 */
const formatCurTime = (currentTime) => {
    // 单位数返回 01 多位数返回 010
    let minute = "0" + Math.floor(currentTime/60)
    // 单位数返回 01 多位数返回 010
    let second = "0" + Math.floor(currentTime-minute*60)
    return minute.substr(-2) +":"+ second.substr(-2)
}

module.exports = {
    $,
    renderPlayerHTML,
    updateProgressHTML
}