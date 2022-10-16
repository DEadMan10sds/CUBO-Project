const bcrypt = require("bcrypt");
const User = require("../models/user");

const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existsUser = await User.findOne({ email: email });
    if (!existsUser)
      return res.status(400).json({ Message: "No existe el usuario" });

    if (!existsUser)
      return res
        .status(400)
        .json({ Message: "El usuario ha sido desactivado" });

    const passwordVerification = bcrypt.compareSync(
      password,
      existsUser.password
    );
    if (!passwordVerification)
      return res.status(400).json({ Message: "Correo o contrasña erroneos" });

    const token = await generateJWT(existsUser.id);
    res
      .status(200)
      .json({ Message: "Logged in succesfully", existsUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Error en login" });
  }
};

module.exports = {
  login,
};
