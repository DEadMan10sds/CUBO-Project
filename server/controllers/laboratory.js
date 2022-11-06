const { Laboratory, Class, User } = require("../models");
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

const createAndAddClass = async (req, res) => {
  const { id } = req.params;
  const dataOfClass = req.body;

  /*const existsUser = await User.findById(dataOfClass.teacher);
  if (!existsUser)
    return res.status(400).json({ Message: "No existe el profesor" });
  */

  const existsLab = await Laboratory.findOne({
    id,
    hours: {
      $nin: dataOfClass.hour,
    },
  });

  if (!existsLab)
    return res.status(400).json({
      Message: "No existe el laboratorio o ya hay una clase a esta hora",
    });

  const newClass = new Class(dataOfClass);
  const result = newClass.save();

  if (!result) {
    return res.status(400).json({ Message: "No se pudo crear la clase" });
  }

  existsLab.classes.push(newClass.id);
  existsLab.hours.push(newClass.hour);

  const updatedLab = existsLab.save();

  if (!updatedLab)
    return res
      .status(400)
      .json({ Message: "No se pudo aádir la clase al laboratorio" });

  return res
    .status(200)
    .json({ Message: "Clase creada y añadida", newClass, existsLab });
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

const deleteClassAndRemoveOfLab = async (req, res) => {
  const { labID, classID } = req.params;
  const dataClass = req.body;

  const deletedFromLab = await Laboratory.findOneAndUpdate(
    {
      id: labID,
      classes: {
        $in: classID,
      },
      hour: {
        $in: dataClass.hour,
      },
    },
    {
      $pull: {
        classes: classID,
        hours: dataClass.hour,
      },
    }
  );

  if (!deletedFromLab)
    return res
      .status(400)
      .json({ Message: "No se logro eliminar la clase del salon" });

  const deleteClass = await Class.findByIdAndDelete(classID);

  if (!deleteClass)
    return res
      .status(400)
      .json({ Message: "No se encuentra la clase a eliminar" });

  return res
    .status(200)
    .json({ Message: "Clase eliminada", deletedFromLab, deleteClass });
};

const deleteClassFromLab = async (req, res) => {
  const { id } = req.params;
  const dataClass = req.body;
  const currentClass = await Class.findOneAndDelete(dataClass.id);
  const currentLab = await Laboratory.findByIdAndUpdate(id, {
    $pull: { classes: dataClass.id, hours: dataClass.hour },
  });
  //await currentLab.save();
  //console.log(currentLab);
  if (!(currentLab || currentClass))
    return res.status(400).json({ Message: "La clase no se pudo eliminar" });
  return res
    .status(200)
    .json({ Message: "La clase se eliminó del laboratorio" });
};

module.exports = {
  getAllLabs,
  getAllActiveLabs,
  createLab,
  createAndAddClass,
  getOneLab,
  editLab,
  deactivateLab,
  deleteLab,
  addClass,
  changeHourOfClass,
  deleteClassAndRemoveOfLab,
  deleteClassFromLab,
};
