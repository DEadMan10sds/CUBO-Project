const { Class, Laboratory } = require("../models");

const getAll = async (req, res) => {
  const classes = await Class.find()
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

const createClass = async (req, res) => {
  const { labID, ...classData } = req.body;
  const existClass = await Class.findOne({
    $and: [{ hour: classData.hour }, { authorized: true }],
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
  createClass,
  editClass,
  deactivateClass,
  deleteClass,
};
