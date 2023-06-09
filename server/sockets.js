class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("cliente connected");
      this.io.emit("server", "hola");

      // Escuchar evento: mensaje-to-server
      socket.on("mensaje-to-server", (data) => {
        console.log(data);

        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
