const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../DB/config");

class Server {
  constructor() {
    this.app = express(); //Instanciamos el servidor

    this.port = process.env.PORT;

    //Rutas
    this.paths = {
      auth: "/api/auth",
      classes: "/api/classes",
      labs: "/api/labs",
      users: "/api/users",
    };

    //Conexión a BD
    this.conectDatabase();

    //Middlewares
    this.middlewares();

    //Router del servidor
    this.routes();
  }

  async conectDatabase() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors()); //Habilita el cors
    this.app.use(express.json()); //Parsea todo por un json
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.classes, require("../routes/class"));
    this.app.use(this.paths.labs, require("../routes/laboratory"));
    this.app.use(this.paths.users, require("../routes/user"));
  }

  //Inicializar el servidor
  listen() {
    this.app.listen(this.port, (req, res) => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  }
}

module.exports = Server;
