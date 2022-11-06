const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("xToken");
  if (!token)
    return res.status(400).json({ Message: "Token de autenticación faltante" });

  try {
    const { id } = jwt.verify(token, process.env.SECRETKEY);
    const usuario = await User.findById(id);
    if (!usuario)
      return res.status(401).json({ Message: "El usuario no existe" });

    /*
    if (!usuario.status)
      return res
        .status(401)
        .json({ Message: "El usuario ha sido desactivado" });
    */

    req.user = usuario;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ Message: "Token no válido", hasError: error });
  }
};

module.exports = {
  validateJWT,
};
