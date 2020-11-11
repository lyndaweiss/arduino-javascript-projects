# Blink-Node.js
Source code for an example in which a commands to blink an LED are sent to an Arduino UNO from a web browser.

### List of Files
- index.html - Contains form with two inputs
- blink-client.js - Client side JavaScript that sends data to server
- server.js - Server implemented with Node.js, gets data from client and sends it on to Arduino UNO
- blink-uno/blink-uno.ino - Arduino sketch that checks for data on serial port and uses it to blink an LED
