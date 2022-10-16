const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");

const { fieldValidation } = require("../middlewares/fieldValidation");
const router = Router();

router.post(
  "/login",
  [
    (check("email", "El correo no es válido").isEmail().notEmpty(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    fieldValidation),
  ],
  login
);

module.exports = router;
