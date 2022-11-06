const { Router } = require("express");
const { check } = require("express-validator");
const { login, validateLogin } = require("../controllers/auth");

const { fieldValidation } = require("../middlewares/fieldValidation");
const { validateJWT } = require("../middlewares/validateJWT");
const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo no es válido").isEmail().notEmpty(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    fieldValidation,
  ],
  login
);

router.post("/reviewToken", [validateJWT], validateLogin);

module.exports = router;
