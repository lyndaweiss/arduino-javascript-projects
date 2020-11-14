# LEGO Motor
Source code for an example in which commands to control a LEGO Power Functions motor are sent to an Arduino UNO from a web browser.

### Installation
1. Clone [arduino-javascript-projects](../master) repository
2. Change directory to arduino-javascript-projects/legomotor-nodejs folder
3. Install [Node.js](https://nodejs.org/en/) (if not already installed)
4. Run `npm install` to install packages needed by Node.js for this example, specifically Serialport and Socket.io.
5. Install [Arduino IDE](https://www.arduino.cc/en/software) (if not already installed)
6. Start Arduino IDE and [add LEGO Power Functions IR library](https://www.arduino.cc/en/Guide/Libraries)

### How to run
1. Identify the name/number of the port the Arduino UNO is connected to (COM* on Windows, /dev/ttyUSB# or /dev/ttyACM* on Linux, replace * with a number)
  1. Set the port in the Ardunio IDE (Tools->Port)
  2. Set the port in legomotor-server.js (change the first argument in the line `const arduinoPort = new serialPort("COM3", { baudRate: 115200 });`
2. Verify/Upload motor-uno.ino
3. Start a command prompt (Windows) or shell (Linux)
  - Go to project directory (arduino-javascript-projects/legomotor-nodejs)
  - Start the server with the command `node legomotor-server.js`
4. Open a browser and enter URL `localhost:8000` to start the client

### List of Files
- index.html - Contains form with motor Start/Stop, Speed, and Direction controls for 2 motors
- legomotor-client.js - Client side JavaScript that sends data to server
- legomotor-server.js - Server implemented with Node.js, gets data from client and sends it on to Arduino UNO
- arduino/motor-uno/motor-uno.ino - Arduino sketch that checks for data on serial port and uses it to send commands to a Power Functions motor
- arduino/LEGOPowerFunctions.zip - LEGO Power Functions IR protocol library, written by Roland Wiersma
- package.json - For managing project dependencies
