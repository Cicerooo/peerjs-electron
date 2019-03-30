const {clipboard} = require("electron");

var host = new Peer({key: 'lwjd5qra8257b9'});
var idInfo;
var status;
var copyId;
var genId;
var connList;
function startHost(){
    host.on('open', function(id) {
        console.log('My peer ID is: ' + id + " running on "+util.browser);
        idInfo.value = id;
        host.on('data', function(data) {
            console.log('Received', data);
        });
        host.on('connection',function(dataConnection){
            console.log("connected to "+dataConnection.peer+" .open:" + dataConnection.open+ " .reliable:"+dataConnection.reliable);
            document.getElementById("connection-status").innerHTML = "Connected";
        });
        host.on('disconnected',function(){
            console.log("lost connection");
            document.getElementById("connection-status").innerHTML = "Lost connection";
        });
        host.on('close',function(){
            console.log("lost connection");
            document.getElementById("connection-status").innerHTML = "Lost connection";
        });
    });
}
function listConnections(){
    connList.innerHTML = "";
    
    console.log(host.connections);
    for(var i=0;i<host.connections.length;i++){
        connList.innerHTML += "<span>"+host.connections[i]+" ("+host.connections[i]._peerBrowser+")"+"</span> "
    }
}

function setHostVariables(){
    status = document.getElementById("connection-status");
    copyId = document.getElementById("copy-id");
    genId = document.getElementById("generate-id");
    idInfo = document.getElementById("id-input");
    connList = document.getElementById("connection-list");
}
function addPeerListeners(){
    var window = remote.getCurrentWindow();
    genId.addEventListener("click",function(){ 
        window.reload();
    });
    copyId.addEventListener("click",function(){
        if(idInfo.value!='')
        clipboard.writeText(idInfo.value);
    });
}

function startServer(){
    setHostVariables();
    startHost();
    addPeerListeners();
}
document.addEventListener("DOMContentLoaded",function(){
    startServer();
})