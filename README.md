# objective realities control panel

Trough this control panel you can monitor the status of OR installation and start the experience.

### MQTT topics:

- /device/roomba/
- /device/plug/commands			start
- /device/fan/commands			start
- /device/main/commands			start

- /device/roomba/fps/				x
- /device/plug/fps/					x
- /device/fan/fps/					x
- /device/main/fps/ 				x
-
- /device/roomba/position/	[x,y]
- /device/plug/angle/				[x,y]

### requirements

Mosqutto should be installed on a local machine and configured with websocket enabled.
conficuration file on mac should be here     `/usr/local/etc/mosquitto/mosquitto.conf`

add this 3 lines to mosquitto conf
```
listener 1883
listener 1884
protocol websockets
```

kill mosquitto and restart it with
```
Lorenzo$ /usr/local/sbin/mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
```

TODO:
- create interface
- create listeners
- test with devices
