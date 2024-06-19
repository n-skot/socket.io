import "dotenv/config";

import express from "express";
import config from "./config/index.js";
import path from "path";

import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer /*, { cors: { origin: "*" } }*/);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/views")));

app.get("/", (req, res) => {
  console.log('dirname', __dirname);
  res.sendFile(__dirname + "/views/index.html");
});

// Socket.io event listeners
io.on("connection", socket => {
  console.log("Clients conectados", io.engine.clientsCount);
  console.log("New client connected", socket.id);

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });

  socket.conn.once("upgrade", () => {
    console.log("Hemos pasado de http long a ", socket.conn.transport.name);
  });
  /*/ Handle message event
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    io.emit("message", message);
  });*/
});

httpServer.listen(config.port, () => { console.log("Server listo en ", config.port); });
