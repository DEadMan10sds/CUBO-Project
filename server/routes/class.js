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

//Post class
router.post(
  "/",
  [check("name", "El nombre no puede estar vacío").notEmpty(), fieldValidation],
  createClass
);

//update class
router.put("/edit/:id", editClass);

//Deactivate class
router.put("/deactivate/:id", deactivateClass);

//delete class
router.delete("/delete/:id", deleteClass);

module.exports = router;
