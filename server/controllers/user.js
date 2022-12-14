const { response } = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { existUser } = require("../helpers/existsUser");

const loopEncriptions = bcrypt.genSaltSync(10);

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
      Message: "Ya existe un usuario con esta clave universitaria o correo",
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
  //Elimina password y role para hacerlas variables independientes
  const dataToUpdate = req.body;

  const existsUser = await User.findById(id);

  if (!existsUser)
    return res.status(400).json({ Message: "No existe el usuario" });

  const duplicatedEmali = await User.findOne({
    email: dataToUpdate.email,
    status: false,
  });
  if (duplicatedEmali)
    return res
      .status(400)
      .json({ Message: "El correo ya está registrado con otro usuario" });

  const editedUser = await User.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
  });

  //console.log(editedData);

  return res.status(200).json({ Message: "Usuario editado", editedUser });
};

/**
 *
 *
 * CAMBIAR LOS FIND ONE POR FIND BY ID
 *
 *
 */

const deactivateUser = async (req, res = response) => {
  const { id } = req.params;
  const deactivateUser = await User.findByIdAndUpdate(
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
