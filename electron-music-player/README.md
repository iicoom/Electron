# electron-quick-start

**Clone and run for a quick way to see Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)

## 总结
[Electron 应用架构](https://www.electronjs.org/docs/tutorial/application-architecture#using-nodejs-apis)
### 主进程 - Main Process

- 可以使用与操作系统对接的 Electron API

- 创建渲染进程 Renderer Process

- 全面支持 Node.js

- 只有一个主进程 作为整个程序的入口


### 渲染进程 - Renderer Process

- 可以有多个 每个对应一个窗口

- 每个都是单独的进程

- 全面支持 Node.js 和 DOM API

- 可以使用一部分 Electron API


### IPC 进程间通信

Electron 使用IPC（interprocess communication）通信

- ipcMain

- ipcRenderer


### 在 HTML 的 <script></script> 中使用 node.js require

需要在 BrowserWindow 中设置
```js
webPreferences: {
    nodeIntegration: true,
}
```

### Electron API

1. [BrowserWindow](https://www.electronjs.org/docs/api/browser-window#wingetparentwindow)

2. [dialog](https://www.electronjs.org/docs/api/dialog#dialogshowerrorboxtitle-content)


### 程序调试
打开每个窗口的控制台，可以直接定位异常

### 打包发布 - electron-builder
https://github.com/electron-userland/electron-builder
