# Weather Station using ES32 and BME280
## _The Last Markdown Editor, Ever_


## Features
- Read temperature, humidity and pressure with BME280 sensor.
- Send this data to server by http protocol with ESP32
- Save data in a database mysql.
- Show this data in a web client.

## This repo contain:

- esp32 code
- bme280 library
- sql script of database in mysql
- Web Serber in node js
- Web client in react js


## Installation
### For Esp32 and BME280 simulator
```sh
cd esp32-simulator
wget -O get-platformio.py https://raw.githubusercontent.com/platformio/platformio-core-installer/master/get-platformio.py
platformio.exe debug
```

### For Database
Database requires MySQL or another sql Database
run weatherdb.sql

### For Web Server
Web server requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies and start the server.

```sh
cd WheatherStationServer
npm i
node ./server/server.js
```
### For Web Client
Web server requires [React.js](https://react.dev/) v10+ to run.
Install the dependencies and devDependencies and start the server.
```sh
cd wheater-station-client
npm i
npm run start
```
