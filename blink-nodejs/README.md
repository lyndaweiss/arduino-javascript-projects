# Blink-Node.js
Source code for an example in which a commands to blink an LED are sent to an Arduino UNO from a web browser.

Go to [arduino-javascript.lyndaweiss.net](http://arduino-javascript.lyndaweiss.net/overview) for a full tutorial!

### How to run
1. Download [arduino-projects](../master) repository, and extract blink-nodejs folder
2. Change directory to blink-nodejs folder
3. Install [Node.js](https://nodejs.org/en/)
4. Run `npm install` to install packages needed by Node.js for this example, specifically Serialport and Socket.io.

### List of Files
- index.html - Contains form with two inputs
- blink-client.js - Client side JavaScript that sends data to server
- server.js - Server implemented with Node.js, gets data from client and sends it on to Arduino UNO
- blink-uno/blink-uno.ino - Arduino sketch that checks for data on serial port and uses it to blink an LED
- package.json - For managing project dependencies
