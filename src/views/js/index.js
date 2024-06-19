const socket = io();

function checkConnect() {
  console.log("Estado del socket: ", socket.connected)
}

socket.on("connect", () => {
  console.log(socket.id);
  checkConnect();
});

socket.on("disconnect", () => {
  console.log("Cleinte desconectado");
  checkConnect();
})

socket.on("connect_error", () => {
  console.log("No pude conectarme")
})

socket.io.on("reconnect_attempt", () => {
  console.log("reconectando :'V");
})

socket.io.on("reconnect", () => {
  console.log("reconectado c;")
})
