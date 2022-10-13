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
} = require("../controllers/laboratory");
const { fieldValidation } = require("../middlewares/fieldValidation");

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
  [check("name", "El nombre no puede estar vacío").notEmpty(), fieldValidation],
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

router.post("/addClass/:id", addClass);

module.exports = router;
