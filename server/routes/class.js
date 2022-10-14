const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { fieldValidation } = require("../middlewares/fieldValidation");

const {
  getAll,
  getSingle,
  createClass,
  deactivateClass,
  deleteClass,
  editClass,
  getClassesByLab,
} = require("../controllers/class");

//All
router.get("/", getAll);

//Single
router.get(
  "/:id",
  [
    check("id", "El id de clase debe ser valido").isMongoId().notEmpty(),
    fieldValidation,
  ],
  getSingle
);

//CREAR RUTA PARA OBTENER CLASES DE ACUERDO AL LABORATORIO
router.get(
  "/ByLab/:labID",
  [
    check("labID", "No es un id valido").isMongoId().notEmpty(),
    fieldValidation,
  ],
  getClassesByLab
);

//Post class
router.post(
  "/",
  [check("name", "El nombre no puede estar vacío").notEmpty(), fieldValidation],
  createClass
);

//update class
router.put(
  "/edit/:id",
  [check("id", "No es un id valido").isMongoId().notEmpty(), fieldValidation],
  editClass
);

//Deactivate class
router.put(
  "/deactivate/:id",
  [check("id", "No es un id valido").isMongoId().notEmpty(), fieldValidation],
  deactivateClass
);

//delete class
router.delete(
  "/delete/:id",
  [check("id", "No es un id valido").isMongoId().notEmpty(), fieldValidation],
  deleteClass
);

module.exports = router;
