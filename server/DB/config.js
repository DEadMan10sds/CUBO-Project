const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_LOCAL);
    console.log("Base de datos local en línea");
  } catch (errorLocal) {
    console.log("Error al conectarse a la base de datos", {
      errorLocal,
    });
  }
};

module.exports = { dbConnection };
