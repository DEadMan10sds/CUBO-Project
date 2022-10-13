const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../DB/config");

class Server {
  constructor() {
    this.app = express(); //Instanciamos el servidor

    this.port = process.env.PORT;

    //Rutas
    this.paths = {
      users: "/api/users",
      labs: "/api/labs",
      classes: "/api/classes",
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
    this.app.use(this.paths.users, require("../routes/user"));
    this.app.use(this.paths.labs, require("../routes/laboratory"));
    this.app.use(this.paths.classes, require("../routes/class"));
  }

  //Inicializar el servidor
  listen() {
    this.app.listen(this.port, (req, res) => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  }
}

module.exports = Server;
