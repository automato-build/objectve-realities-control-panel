client = new Paho.MQTT.Client("127.0.0.1", Number(1884), "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({
	onSuccess: onConnect
});


// called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("connected to mosquitto");
	client.subscribe("or/#");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:" + responseObject.errorMessage);
	}
}

// called when a message arrives
function onMessageArrived(message) {
	console.log(message.destinationName + " -> " + message.payloadString);

	var address = message.destinationName.split('/');

	if (address[1] == 'device') {
		switch (address[2]) {
			case 'fan':
				console.log("got a message from/for the fan")
				if (address[3]=='fps'){
					$('#fan_fps').html(message.payloadString);
				}
				break;
			case 'roomba':
				console.log("got a message from/for the roomba")
				if (address[3]=='fps'){
					$('#roomba_fps').html(message.payloadString);
				}
				break;
			case 'plug':
				console.log("got a message from/for the plug")
				console.log(address[3]);
				if (address[3]=='fps'){
					console.log("ffffff");
					$('#plug_fps').text(message.payloadString);
				}
				break;
			default:

		}
	}
}

function startAll() {
	console.log("sending start commant to all devices...");
	startPlug();
	startFan();
	startRoomba();
}

function startFan() {
	message = new Paho.MQTT.Message("start");
	message.destinationName = "or/device/fan";
	client.send(message);
}

function startRoomba() {
	message = new Paho.MQTT.Message("start");
	message.destinationName = "or/device/roomba";
	client.send(message);
}

function startPlug() {
	message = new Paho.MQTT.Message("start");
	message.destinationName = "or/device/plug";
	client.send(message);
}
