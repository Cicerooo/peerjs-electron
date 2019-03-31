const {clipboard} = require("electron");

var peer = new Peer({key: 'lwjd5qra8257b9'});
var conn;
var inputId;
var status;
var pasteId;
var connectBtn;
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

function setPeerVariables(){
    status = document.getElementById("connection-status");
    pasteId = document.getElementById("paste-id");
    connectBtn = document.getElementById("connect");
    inputId = document.getElementById("id-input");
}
function addPeerListeners(){
    var window = remote.getCurrentWindow();
    connectBtn.addEventListener("click",function(){ 
        if(inputId.value!='')
        conn = peer.connect(inputId.value);
        conn.on("data",function(data){
            console.log("received "+data);
        });
        conn.on("open",function(dataConnection){
            console.log("connected");
            document.getElementById("connection-status").innerHTML = 'Connected';
        })
        conn.send("test");
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