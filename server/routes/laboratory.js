const { Router } = require("express");
const { check } = require("express-validator");
const {
  getAllLabs,
  createLab,
  editLab,
  deactivateLab,
  deleteLab,
  getOneLab,
  addClass,
  getAllActiveLabs,
  deleteClassFromLab,
  changeHourOfClass,
} = require("../controllers/laboratory");
const { fieldValidation } = require("../middlewares/fieldValidation");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

//All labs
router.get("/", getAllLabs);

//Active labs
router.get("/active", getAllActiveLabs);

//Single lab
router.get(
  "/:id",
  [
    check("id", "El id  de mongo no debe estar vacío").notEmpty().isMongoId(),
    fieldValidation,
  ],
  getOneLab
);

//Create lab
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre no puede estar vacío").notEmpty(),
    fieldValidation,
  ],
  createLab
);

//Edit lab
router.put(
  "/:id",
  [
    check("id", "El nombre no puede estar vacío").notEmpty().isMongoId(),
    fieldValidation,
  ],
  editLab
);

//Deactivate labss
router.put(
  "/deactivate/:id",
  [
    check("id", "El id no puede estar vacío").notEmpty().isMongoId(),
    fieldValidation,
  ],
  deactivateLab
);

//Delete lab
router.delete(
  "/delete/:id",
  [
    check("id", "El id no puede estar vacío y debe ser valido")
      .notEmpty()
      .isMongoId(),
    fieldValidation,
  ],
  deleteLab
);

//Añadir clase en el arreglo de classes y hora en el arreglo de hours
//Se usa cuando se actualiza una clase de un labo a otro, junto con la ruta de borrar clase
router.post(
  "/addClassToLab/:id",
  [
    check("id", "El id debe ser válido").isMongoId().notEmpty(),
    fieldValidation,
  ],
  addClass
);

router.post(
  "/changeHour/:id",
  [
    check("id", "El ID debe ser válido").isMongoId().notEmpty(),
    fieldValidation,
  ],
  changeHourOfClass
);

router.post(
  "/deleteClassFromLab/:id",
  [
    check("id", "El id del laboratorio no es válido").isMongoId().notEmpty(),
    fieldValidation,
  ],
  deleteClassFromLab
);

module.exports = router;
