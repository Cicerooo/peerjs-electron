const electron = require('electron');
const url = require('url');
const path = require('path');

const {app,BrowserWindow,Menu,IncomingMessage} = electron;

let window;

// Listen for app ready
app.on("ready",function(){
    window = new BrowserWindow({width:400,height:550,minHeight:550,minWidth:400,frame:false,title:"Loading...",resizable:true,backgroundColor:"#304042",nodeIntegration:true})
    window.loadURL(url.format({
        pathname: path.join(__dirname,"index.html"),
        protocol: 'file',
        slashes:true
    }));
    //window.loadURL("https://jmcker.github.io/Peer-to-Peer-Cue-System/send.html");
})