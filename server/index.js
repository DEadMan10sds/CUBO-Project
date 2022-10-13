require("dotenv").config();

const Server = require("./models/server");

//Create server instance with class
const server = new Server();
server.listen(); //Entra al método listen e inicia el servidor
