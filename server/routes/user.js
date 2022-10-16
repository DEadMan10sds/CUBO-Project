const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const {
  getUser,
  createUser,
  editUser,
  deactivateUser,
  deleteUser,
} = require("../controllers/user");
const { fieldValidation } = require("../middlewares/fieldValidation");
const { validateJWT } = require("../middlewares/validateJWT");

//Unique user
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "El id del usuario no puede estar vacio")
      .isMongoId()
      .notEmpty(),
    fieldValidation,
  ],
  getUser
);

//Create user
router.post(
  "/",
  [
    check(
      ["name", "surname", "email", "uniKey", "password", "role"],
      "No puede haber campos vacíos"
    ).notEmpty(),
    check("uniKey", "El id solo puede ser numérico").isNumeric().isInt(),
    check("email", "El correo debe ser valido").isEmail(),
    check(
      ["name", "surname"],
      "No se pueden guardar nombres con numeros"
    ).isAlpha("es-ES", { ignore: " " }),
    check(
      "password",
      "La contraseña debe tener un mínimo de 8 caracteres"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }),
    fieldValidation,
  ],
  createUser
);

//Edit user
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "El id solo puede ser numérico").isMongoId().notEmpty(),
    check("email", "El correo debe ser valido").optional().isEmail(),
    check(
      ["name", "surname"],
      "No se pueden guardar nombres con numeros"
    ).isAlpha("es-ES", { ignore: " " }),
    fieldValidation,
  ],
  editUser
);

//Deactivate user
router.put(
  "/deactivate/:id",
  [check("id", "El id no puede estar vacio").notEmpty(), fieldValidation],
  deactivateUser
);

//Delete user
router.delete(
  "/delete/:id",
  [check("id", "El id no puede estar vacio").notEmpty(), fieldValidation],
  deleteUser
);

module.exports = router;
