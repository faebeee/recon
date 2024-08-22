// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {contextBridge, ipcRenderer} = require('electron/renderer')

contextBridge.exposeInMainWorld('backendApi', {
  saveNodes: (data) => ipcRenderer.send('save-nodes', data),
  saveEdges: (data) => ipcRenderer.send('save-edges', data),
  loadNodes: () => ipcRenderer.invoke('load-nodes'),
  loadEdges: () => ipcRenderer.invoke('load-edges'),
})