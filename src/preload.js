const { contextBridge, ipcRenderer, clipboard } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  reloadPage: () => ipcRenderer.send('reload-page'),
  copyText: (copiedText) => ipcRenderer.send('copy-text', copiedText),
  pasteText: () => ipcRenderer.invoke('paste-text')

})

contextBridge.exposeInMainWorld('titlebar', {
  closeWindow: () => ipcRenderer.send('close-window'),
  maxWindow: () => ipcRenderer.send('max-window'),
  minWindow: () => ipcRenderer.send('min-window')
})

contextBridge.exposeInMainWorld('peerAPI', {
  addListener: () => ipcRenderer.send('add-listener')
})