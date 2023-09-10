const {app,BrowserWindow,ipcMain,Menu,IncomingMessage,clipboard } = require('electron');
const url = require('url');
const path = require('path');

let win;

// Windows API Section
function minWindow() {
   win.minimize();
}
function maxWindow() {
    win.isMaximized() ? win.unmaximize() : win.maximize();
}
function closeWindow() {
    console.log("Closing window..");
    app.quit();
}
ipcMain.on('min-window', minWindow);
ipcMain.on('max-window', maxWindow);
ipcMain.on('close-window', closeWindow);
// End Windows API Section

// Peerjs Section

// Peerjs Server Section

// End Peerjs Server Section

// Peerjs Client Section
//ipcMain.on('add-listener')
// End Peerjs Client Section

// End Peerjs Section

// Main Electron Body
function reloadPage() {
    console.log("Reloading page..");
    win.reload();
}

function copyText(event, copiedText) {
    try{
        clipboard.writeText(copiedText);
        console.log(`Copied text: ${copiedText}`);
    }
    catch(err) {
        console.log(err);
    }
}

app.on("ready",function(){
    win = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            //contextIsolation:false,
            preload: path.join(__dirname, 'src/preload.js')
        },
        width:400,
        height:550,
        minHeight:550,
        minWidth:400,
        frame:false,
        title:"Loading...",
        resizable:true,
        backgroundColor:"#304042",
        })
        win.loadFile('index.html');
});

ipcMain.on('reload-page', reloadPage)
ipcMain.on('copy-text',copyText)
ipcMain.handle("paste-text", async (event, ...args) => {
    const clipboardText = clipboard.readText();
    return clipboardText;
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });

// End Main Electron Body