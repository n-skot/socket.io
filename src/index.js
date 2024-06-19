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
  socket.emit("Welcome", "Ahora estas conectado a socket ;)");

  socket.on("server", data => {
    console.log(data);
  })

  io.emit("everyone", socket.id + " Se ha conectado");
});

httpServer.listen(config.port, () => { console.log("Server listo en ", config.port); });
