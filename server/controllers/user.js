const { response } = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { existUser } = require("../helpers/existsUser");

const loopEncriptions = bcrypt.genSaltSync();

const getUser = async (req, res = response) => {
  const { id } = req.params;
  const userResult = await User.findById(id);
  if (!userResult)
    return res.status(400).json({ Message: "No se encontró el usuario" });
  return res.status(200).json({ Message: "Usuario encontrado", userResult });
};

const createUser = async (req, res = response) => {
  const userData = req.body;
  const existsUser = await existUser(userData);
  if (existsUser)
    return res.status(400).json({
      Message: "Ya existe un usuario con este id o correo",
      existsUser,
    });

  //Instancia del modelo que se va a guardar
  const newUser = new User(userData);

  //Encriptación de la password
  newUser.password = bcrypt.hashSync(newUser.password, loopEncriptions);

  //Guardado del registro
  const insert = await newUser.save();

  return res.status(200).json({
    Message: "Usuario agregado correctamente",
    insert,
  });
};

const editUser = async (req, res = response) => {
  const { id } = req.params;
  //Elimina password y role para hacerlas variables independientes y no tenerlas en userData
  const { password, ...dataToUpdate } = req.body;

  const existsUser = await User.findById(id);
  //Crear validación de password

  if (!existsUser)
    return res.status(400).json({ Message: "No existe el usuario" });

  const verifiedPass = bcrypt.hashSync(password, loopEncriptions);
  if (!bcrypt.compareSync(existsUser.password, verifiedPass))
    return res.status(400).json({ Message: "Contraseña incorrecta" });

  const editedData = await User.findOneAndUpdate(id, dataToUpdate);

  return res.status(200).json({ Message: "Usuario editado", editedData });
};

const deactivateUser = async (req, res = response) => {
  const { id } = req.params;
  const deactivateUser = await User.findOneAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  if (!deactivateUser)
    return res.status(400).json({ Message: "Usuario no encontrado" });
  return res
    .status(200)
    .json({ Message: "Usuario desactivado", deactivateUser });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const existsUser = await User.findOneAndDelete(id);
  if (!existsUser)
    return res.status(400).json({ Message: "Usuario no encontrado" });
  return res.status(200).json({ Message: "Usuario eliminado", existsUser });
};

module.exports = {
  getUser,
  createUser,
  editUser,
  deactivateUser,
  deleteUser,
};
