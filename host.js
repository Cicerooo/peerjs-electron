const {clipboard} = require("electron");

var host = new Peer({key: 'lwjd5qra8257b9'});
var conn;
var idInfo;
var status;
var copyId;
var genId;
var connList;

function addMessage(name, text){
    var message = document.getElementsByClassName("message")[0].cloneNode(true);
    message.getElementsByClassName("message-sender")[0].innerHTML = name;
    message.getElementsByClassName("message-text")[0].innerHTML = text;
    document.getElementById("messages").appendChild(message);
}
function sendMessage(){
    var text = document.getElementById("message").value;
    if(text != ""){
        document.getElementById("message").value = "";
        conn.send(text);
        addMessage("you",text);
    }
}
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
            conn = dataConnection;
            dataConnection.on('data',function(data){
                addMessage("them", data);
                console.log("got data: "+data);
            });
            document.getElementById("connection-panel").classList.add("hidden");
            document.getElementById("messaging-panel").classList.remove("hidden");
            document.getElementById("message").addEventListener("keydown",function(e){
                if(e.key==="Enter")
                    sendMessage();
            });
            document.getElementById("send").addEventListener("click",function(){
                sendMessage();
            });
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
    connList.innerHTML = "connected to" + host.connections.length;
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
    document.getElementById("disconnect").addEventListener("click",function(){
        window.reload();
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