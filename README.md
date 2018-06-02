# objective realities control panel

Trough this control panel you can monitor the status of OR installation and start the experience.

### MQTT topics:

- or/device/roomba/commands   start
- or/device/plug/commands			start
- or/device/fan/commands			start
- or/device/main/commands			start

- or/device/roomba/fps/				x
- or/device/plug/fps/					x
- or/device/fan/fps/					x
- or/device/main/fps/ 				x
-
- or/device/roomba/position/	[x,y]
- or/device/plug/angle/				[x,y]

- or/device/roomba/scene/				x
- or/device/plug/scene/					x
- or/device/fan/scene/					x
- or/device/main/scene/ 				x


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
