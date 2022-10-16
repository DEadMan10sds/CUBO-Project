const { Laboratory } = require("../models");
const { findByIdAndUpdate } = require("../models/laboratory");

const getAllLabs = async (req, res) => {
  const laboratories = await Laboratory.find();
  if (laboratories.length === 0) return res.status(200).json([]);

  return res.status(200).json(laboratories);
};

const getAllActiveLabs = async (req, res) => {
  const laboratories = await Laboratory.find({ status: true });
  if (laboratories.length === 0)
    return res.status(400).json({ Message: "No hay laboratorios activados" });

  return res.status(200).json(laboratories);
};

const getOneLab = async (req, res) => {
  const { id } = req.params;
  const currentLab = await Laboratory.findById(id);
  if (!currentLab)
    return res.status(400).json({ Message: "No existe este laboratorio" });

  return res
    .status(200)
    .json({ Message: "Laboratorio encontrado", currentLab });
};

const createLab = async (req, res) => {
  const dataLab = req.body;
  dataLab.name = dataLab.name.toUpperCase();
  const existsLab = await Laboratory.findOne({ name: dataLab.name });
  if (existsLab)
    return res
      .status(400)
      .json({ Message: "Ya existe un laboratorio con este nombre" });

  const newLab = new Laboratory(dataLab);
  const result = await newLab.save();

  return res.status(200).json({ Message: "Labo creado exitosamente", result });
};

const editLab = async (req, res) => {
  const { id } = req.params;
  const dataLab = req.body;
  dataLab.name = dataLab.name.toUpperCase();
  const existsLab = await Laboratory.findByIdAndUpdate(id, dataLab);

  if (!existsLab)
    return res.status(400).json({ Message: "No existe el laboratorio" });

  return res
    .status(200)
    .json({ Message: "Laboratorio editado correctamente", existsLab });
};

const deactivateLab = async (req, res) => {
  const { id } = req.params;
  const deactivation = await Laboratory.findByIdAndUpdate(id, {
    status: false,
  });
  if (!deactivation)
    return res.status(400).json({ Message: "No se encontró el laboratorio" });

  return res
    .status(200)
    .json({ Message: "Laboratorio desactivado", deactivation });
};

const deleteLab = async (req, res) => {
  const { id } = req.params;
  const deletedLab = await Laboratory.findByIdAndDelete(id);
  if (!deletedLab)
    return res.status(400).json({ Message: "Laboratorio no encontrado" });

  return res
    .status(200)
    .json({ Message: "Laboratorio eliminado correctamente", deletedLab });
};

const addClass = async (req, res) => {
  const { id } = req.params;
  const dataClass = req.body;
  //console.log(dataClass);
  const currrentLab = await Laboratory.findByIdAndUpdate(id, {
    $push: { classes: dataClass.id, hours: dataClass.hour },
  });
  //console.log(currrentLab);
  if (!currrentLab)
    return res
      .status(400)
      .json({ Message: "No se pudo agregar la clase al laboratorio" });
  return res.status(200).json({ Message: "Clase agregada", currrentLab });
};

const changeHourOfClass = async (req, res) => {
  const { id } = req.params;
  const { newHour, oldHour } = req.body;
  //console.log({ newHour, oldHour });
  const currentLab = await Laboratory.findById(id);
  let indexOfOldHour = currentLab.hours.indexOf(oldHour);
  currentLab.hours[indexOfOldHour] = newHour;
  await currentLab.save();
  //console.log(currentLab);
  if (!currentLab)
    return res.status(400).json({
      Message: "No se pudo actualizar la hora de la clase en el laboratorio",
    });
  return res.status(200).json({ Message: "Hora actualizada correctamente" });
};

const deleteClassFromLab = async (req, res) => {
  const { id } = req.params;
  const dataClass = req.body;
  const currentLab = await Laboratory.findByIdAndUpdate(id, {
    $pull: { classes: dataClass.id, hours: dataClass.hour },
  });
  //await currentLab.save();
  //console.log(currentLab);
  if (!currentLab)
    return res.status(400).json({ Message: "La clase no se pudo eliminar" });
  return res
    .status(200)
    .json({ Message: "La clase se eliminó del laboratorio" });
};

module.exports = {
  getAllLabs,
  getAllActiveLabs,
  createLab,
  getOneLab,
  editLab,
  deactivateLab,
  deleteLab,
  addClass,
  changeHourOfClass,
  deleteClassFromLab,
};
