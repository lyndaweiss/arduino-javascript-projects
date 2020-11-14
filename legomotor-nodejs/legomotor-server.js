// Modules needed for web server, and file system access
const http = require("http");
const fs = require("fs");
const path = require("path");
// Modules for interfacing with the USB port and socket communication with the client
const serialPort = require("serialport");
const socketio = require("socket.io");

// Web server handler callback
function handler(request, response) {
  // Get the filename from request URL sent by browser
  let fileName = request.url;
  if (request.url === "/") {
    fileName += "index.html";
  }

  // Content types for writing HTTP header
  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".ico": "image/x-icon",
  };

  // Read and serve requested file
  fs.readFile(`${__dirname}${fileName}`, (err, data) => {
    if (err) {
      response.writeHead(500);
      return response.end(`Error loading ${path.basename(fileName)}`);
    }

    response.writeHead(200, {
      "Content-Type": `${contentTypes[path.extname(fileName)]}`,
    });
    response.end(data);
  });
}

// Create HTTP server and register its handler
const server = http.createServer(handler);

// Create and open serial port connection to Arduino
const arduinoPort = new serialPort("COM3", { baudRate: 115200 });
arduinoPort.on("open", () => console.log(`Serial port to Arduino opened.`));
arduinoPort.on("error", (err) => console.log(`Error: ${err.message}`));
arduinoPort.on("data", (data) => console.log(data.toString()));

// Create socket and attach to HTTP server
const socketServer = socketio.listen(server);
// Listen and handle client socket connections
socketServer.on("connect", (socket) => {
  // Client led message event listener
  socket.on("motor", (data) => {
    const motorData = `${data["direction"]}:${data["speed"]}:${data["motor"]}:`;
    console.log(`Message to Arduino - ${motorData}`);
    arduinoPort.write(motorData);
  });
});

// Start server and have it listen on port 8000
server.listen(8000, "localhost");
