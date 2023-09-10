function loadListeners(){
    //Turn these into IPC events that handle sending the requests to the main render process and executing the events there.
    document.getElementById("close").addEventListener("click",function(){
        window.titlebar.closeWindow();
        console.log('Sending event?');
    });
    document.getElementById("minimize").addEventListener("click",function(){
        window.titlebar.minWindow();
    });
    document.getElementById("maximize").addEventListener("click",function(){
        window.titlebar.maxWindow();
    });
}
function toggleMaximizeWindow(){
    let window = remote.getCurrentWindow();
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