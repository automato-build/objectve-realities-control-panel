client = new Paho.MQTT.Client("192.168.0.101", Number(1884), "clientId");

//client = new Paho.MQTT.Client("broker.shiftr.io", Number(443), "controlpanel");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client using shiftr
// client.connect({
// 	onSuccess: onConnect,
// 	userName:"automato",
// 	password:"7ffa6081e4db88d1",
// 	useSSL:true,
// });

//connect to the client on local network
client.connect({
	onSuccess: onConnect,
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
				blinkFan();
				console.log("got a message from/for the fan")
				if (address[3] == 'fps') {
					$('#fan_fps').html(message.payloadString);
				} else if (address[3] == 'position') {
					$('#fan_angle').html(message.payloadString);
				} else if (address[3] == 'scene') {
					$('#fan_scene').html(message.payloadString);
				}else if (address[3] == 'batterystatus') {
					$('#fan_battery_status').html(message.payloadString);
				}else if (address[3] == 'batterylevel') {
					$('#fan_battery_level').html(message.payloadString);
				}

				break;
			case 'roomba':
				blinkRoomba();
				console.log("got a message from/for the roomba")
				if (address[3] == 'fps') {
					$('#roomba_fps').html(message.payloadString);
				} else if (address[3] == 'position') {
					var positionArray = message.payloadString.split(',');
					$('#roomba_Xposition').html(positionArray[0]);
					$('#roomba_Yposition').html(positionArray[1]);
					$('#roomba_Zposition').html(positionArray[2]);
				} else if (address[3] == 'scene') {
					$('#roomba_scene').html(message.payloadString);
				}else if (address[3] == 'batterystatus') {
					$('#roomba_battery_status').html(message.payloadString);
				}else if (address[3] == 'batterylevel') {
					$('#roomba_battery_level').html(message.payloadString);
				}
				break;
			case 'plug':
				blinkPlug();
				console.log("got a message from/for the plug")
				console.log(address[3]);
				if (address[3] == 'fps') {
					$('#plug_fps').text(message.payloadString);
				} else if (address[3] == 'position') {
					var positionArray = message.payloadString.split(',');
					$('#plug_id').html(positionArray[0]);
					//$('#plug_description').html(positionArray[0]);
				} else if (address[3] == 'scene') {
					$('#plug_scene').html(message.payloadString);
				}else if (address[3] == 'batterystatus') {
					$('#plug_battery_status').html(message.payloadString);
				}else if (address[3] == 'batterylevel') {
					$('#plug_battery_level').html(message.payloadString);
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
	message.destinationName = "or/device/fan/commands";
	client.send(message);
}

function startRoomba() {
	message = new Paho.MQTT.Message("start");
	message.destinationName = "or/device/roomba/commands";
	client.send(message);
}

function startPlug() {
	message = new Paho.MQTT.Message("start");
	message.destinationName = "or/device/plug/commands";
	client.send(message);
}

function blinkRoomba() {
	$('#roomba h1').toggleClass("blink", true);
	setTimeout(function() {
		$('#roomba h1').toggleClass("blink", false);
	}, 100);
}

function blinkFan() {
	$('#fan h1').toggleClass("blink", true);
	setTimeout(function() {
		$('#fan h1').toggleClass("blink", false);
	}, 100);
}

function blinkPlug() {
	$('#plug h1').toggleClass("blink", true);
	setTimeout(function() {
		$('#plug h1').toggleClass("blink", false);
	}, 100);
}
