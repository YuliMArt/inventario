const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const fileUpload = require("express-fileupload");
const Sockets = require("./sockets");
const db = require("../database/conexion");
const exp = express();
const server = http.createServer(exp);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    Credentials: true,
  },
});

class Server {
  constructor() {
    this.app = exp;
    this.port = 9007;
    this.paths = {
      main: "/api/main",
    };
    this.server = server;
    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
    this.io = io;
    this.configurarSockets();
  }

  async conectarDB() {
    try {
      await db.authenticate();
      console.log("database online");
    } catch (error) {
      throw new Error(error);
    }
  }
  async configurarSockets() {
    new Sockets(this.io);
  }
  middlewares() {
    // CORS
    this.app.use(cors());
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header("Content-Type: multipart/form-data;charset=UTF-8;");
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.main, require("../routes/main"));
    // this.app.use(this.paths.roteos, require("../routes/roteos"));
  }

  execute() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = { Server, io };
