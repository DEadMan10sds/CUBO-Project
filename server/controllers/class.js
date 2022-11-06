const { Class, Laboratory } = require("../models");

const getAll = async (req, res) => {
  const { status = true, authorized = true } = req.query;
  const classes = await Class.find({ status, authorized })
    .populate("place", "name")
    .populate("teacher", "name");
  if (classes.length === 0)
    return res
      .status(400)
      .json({ Message: "No hay clases para este laboratorio" });

  return res.status(200).json({ Message: "Clases encontradas", classes });
};

const getSingle = async (req, res) => {
  const { id } = req.params;
  const classSelected = await Class.findById(id)
    .populate("place", "name")
    .populate("teacher", "name");
  if (!classSelected)
    return res.status(400).json({ Message: "No existe esta clase" });

  return res.status(200).json({ Message: "Clase encontrada", classSelected });
};

const getClassesByLab = async (req, res) => {
  const { labID } = req.params;
  //console.log("LabID", labID);
  const existLab = await Laboratory.findById(labID);

  if (!existLab)
    return res.status(400).json({ Message: "No existe este labo" });

  const classesByLab = await Class.find({
    $and: [{ place: labID }],
  }).populate({
    path: "teacher",
    select: ["name", "surname"],
  });

  //console.log(classesByLab);

  if (!classesByLab)
    return res
      .status(400)
      .json({ Message: "No existen clases para este labo" });

  return res.status(200).json(classesByLab);
};

const createClass = async (req, res) => {
  const { labID, ...classData } = req.body;
  const existClass = await Class.findOne({
    $and: [{ possibleHour: classData.hour }, { authorized: true }],
  });
  //console.log(existClass);
  if (existClass)
    return res.status(400).json({ Message: "Ya existe clase a esta hora" });

  const newClass = new Class(classData);
  const result = await newClass.save();

  if (!result)
    return res.status(400).json({ Message: "La clase no se creo", result });

  const currrentLab = await Laboratory.findByIdAndUpdate(labID, {
    $push: { classes: result._id },
  });
  //console.log(currrentLab);

  return res.status(200).json({ Message: "Clase creada", result });
};

const createClassByLab = async (req, res) => {
  const newClassData = req.body;
  const existsLab = await Laboratory.findById(newClassData.place);
  if (!existsLab)
    return res.status(400).json({ Message: "No existe el laboratorio" });

  const occupiedHour = existsLab.hours.find(
    (currentHour) => currentHour === newClassData.hour
  );
  if (occupiedHour)
    return res.status(400).json({ Message: "Ya existe una clase a esta hora" });

  const newClass = new Class(newClassData);
  const result = newClass.save();

  //console.log(newClass);

  if (!result) return res.status(400).json({ Message: "Clase no creada" });

  existsLab.hours.push(newClass.hour);
  existsLab.classes.push(newClass.id);

  existsLab.save();

  //console.log(existsLab, newClass);

  //console.log({ existsLab, classAdded: req.body });
  return res
    .status(200)
    .json({ Message: "Classe creada y añadida al labo", newClass });
};

const editClass = async (req, res) => {
  const { id } = req.params;
  const classData = req.body;

  const result = await Class.findByIdAndUpdate(id, classData);

  if (!result)
    return res
      .status(400)
      .json({ Message: "No se encuentra la clase a editar" });

  return res.status(200).json({ Message: "Clase editada", result });
};

const deactivateClass = async (req, res) => {
  const { id } = req.params;
  const existsClass = await Class.findByIdAndUpdate(id, { status: false });
  if (!existsClass)
    return res.status(400).json({ Message: "Clase no encontrada" });

  return res.status(200).json({ Message: "Clase desactivada", existsClass });
};

const deleteClass = async (req, res) => {
  const { id } = req.params;
  const existClass = await Class.findByIdAndDelete(id);
  if (!existClass)
    return res.status(400).json({ Message: "Clase no encontrada" });

  return res.status(200).json({ Message: "Clase eliminada" });
};

module.exports = {
  getAll,
  getSingle,
  getClassesByLab,
  createClass,
  createClassByLab,
  editClass,
  deactivateClass,
  deleteClass,
};
