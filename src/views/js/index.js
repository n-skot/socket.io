const socket = io();

socket.on("Welcome", data => {
  text.textContent = data;
});

const emitServer = document.querySelector("#emit-server");
emitServer.addEventListener("click", () => {
  socket.emit("server", "El cliente manda saludos");
});

socket.on("everyone", message => {
  console.log(message);
});
