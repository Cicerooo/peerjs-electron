const remote = require('electron').remote;
const path = require("path");
var ls = window.localStorage;

function loadListeners(){
    var window = remote.getCurrentWindow();
    document.getElementById("close").addEventListener("click",function(){
        window.close()
    });
    document.getElementById("minimize").addEventListener("click",function(){
        window.minimize();
    });
    document.getElementById("maximize").addEventListener("click",function(){
        toggleMaximizeWindow();
    });
}
function toggleMaximizeWindow(){
    var window = remote.getCurrentWindow();
    if(window.isMaximized()){
        window.restore();
    }
    else{
        window.maximize();
    }
}
function start(){
    loadListeners();
}
document.addEventListener("DOMContentLoaded",function(){
    start();
})