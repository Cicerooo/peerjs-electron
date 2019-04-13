const {clipboard} = require("electron");

var peer = new Peer({key: 'lwjd5qra8257b9'});
var conn;
var inputId;
var status;
var pasteId;
var connectBtn;
var messageCont;
function startPeer(){
    peer.on('open', function(id) {
        console.log('My peer ID is: ' + id + " running on "+util.browser);
        peer.on('connection',function(dataConnection){
            console.log("connected to "+dataConnection.peer);
            document.getElementById("connection-status").innerHTML = "Connected to "+dataConnection.peer;
            dataConnection.send("test");
            console.log("connected to "+dataConnection.peer+" .open:" + dataConnection.open + " .reliable:"+dataConnection.reliable);
        });
        peer.on('close',function(){
            console.log("lost connection");
            document.getElementById("connection-status").innerHTML = "Lost connection";
        });
    });
}
function addMessage(name, text){
    var message = document.getElementsByClassName("message")[0].cloneNode(true);
    message.getElementsByClassName("message-sender")[0].innerHTML = name;
    message.getElementsByClassName("message-text")[0].innerHTML = text;
    messageCont.appendChild(message);
}
function sendMessage(){
    var text = document.getElementById("message").value;
    if(text != ""){
        document.getElementById("message").value = "";
        conn.send(text);
        addMessage("you",text);
    }

}
function setPeerVariables(){
    status = document.getElementById("connection-status");
    pasteId = document.getElementById("paste-id");
    connectBtn = document.getElementById("connect");
    disconnectBtn = document.getElementById("disconnect");
    inputId = document.getElementById("id-input");
    messageCont = document.getElementById("messages");
}
function addPeerListeners(){
    var window = remote.getCurrentWindow();
    connectBtn.addEventListener("click",function(){ 
        if(inputId.value!='')
        conn = peer.connect(inputId.value);
        conn.on("data",function(data){
            console.log("received "+data);
            addMessage("them",data);
        });
        conn.on("open",function(dataConnection){
            console.log("connected");
            document.getElementById("connection-status").innerHTML = 'Connected';
            document.getElementById("connection-panel").classList.add("hidden");
            document.getElementById("messaging-panel").classList.remove("hidden");
            document.getElementById("disconnect").addEventListener("click",function(){
                window.reload();
            });
            document.getElementById("message").addEventListener("keydown",function(e){
                if(e.key==="Enter")
                    sendMessage();
            });
            document.getElementById("send").addEventListener("click",function(){
                sendMessage();
            });
        });
    });
    pasteId.addEventListener("click",function(){
        inputId.value = clipboard.readText();
    });
}

function startServer(){
    setPeerVariables();
    startPeer();
    addPeerListeners();
}
document.addEventListener("DOMContentLoaded",function(){
    startServer();
})