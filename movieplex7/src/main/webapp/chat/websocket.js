/**
 * excz010715
 */
var wsUri='ws://'+document.location.host+document.location.pathname.substr(0,document.location.pathname.indexOf("/faces"))+'/websocket';
console.log(wsUri);
var websocket=new WebSocket(wsUri);
var textField=document.getElementById("textField");
var users=document.getElementById("users");
var chatlog=document.getElementById("chatlog");
var username;
//Listeners son manejadores de eventos
websocket.onopen=function(evt){onOpen(evt);};//La conexión Websocket es iniciada.
websocket.onmessage=function(evt){onMessage(evt);};//Un mensaje Websockect es recibido
websocket.onerror=function(evt){onError(evt)};//Un error ocurrio durante la comunicación
websocket.onclose=function(evt){onClose(evt)};//Una conexión Websockect es terminada
var output=document.getElementById("output");

function join(){//Envia un mensaje al endpoint al que un usuario se ha unido. El endpoint luego difunde el mensaje a todos los clientes que lo escuchan
	username=textField.value;
	websocket.send(username+" joined");
}
function send_message(){//Concatena el nombre del usuario que se ha conectado y el valor del campo de tecto y lo difuende a todos de manera similar
	websocket.send(username+": "+textField.value);
}
function onOpen(){writeToScreen("CONNECTED");}
function onClose(){writeToScreen("DISCONNECTED");}
function onMessage(evt){//actualiza lista de usuarios conectados
	writeToScreen("RECEIVED: "+evt.data);
	if (evt.data.indexOf("joined")!==-1) {
		users.innerHTML+=evt.data.substring(0, evt.data.indexOf("joined"))+"\n";		
	} else {
		chatlog.innerHTML+=evt.data+"\n";
	}
}
function onError(evt){
	writeToScreen('<span style="color:red;">ERROR:</span>')
}
function disconnect(){websocket.close();}
function writeToScreen(message){
	var pre=document.createElement("p");
	pre.style.wordWrap="break-word";
	pre.innerHTML=message;
	output.appendChild(pre);
}