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

//Unique user
router.get(
  "/:id",
  [check("id", "El id del usuario no puede estar vacio").notEmpty()],
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
    ).isAlpha(),
    check(
      "password",
      "La contraseña debe tener un mínimo de 8 caracteres"
    ).matches(/^[a-zA-Z0-9]{8}$/, "i"),
  ],
  createUser
);

//Edit user
router.put(
  "/:id",
  [
    check(
      ["name", "surname", "email", "password", "role", "id"],
      "No puede haber campos vacíos"
    ).notEmpty(),
    check("id", "El id solo puede ser numérico").isNumeric().isInt(),
    check("email", "El correo debe ser valido").isEmail(),
    check(
      ["name", "surname"],
      "No se pueden guardar nombres con numeros"
    ).isAlpha(),
  ],
  editUser
);

//Deactivate user
router.put(
  "/deactivate/:id",
  [check("id", "El id no puede estar vacio").notEmpty()],
  deactivateUser
);

//Delete user
router.delete(
  "/delete/:id",
  [check("id", "El id no puede estar vacio").notEmpty()],
  deleteUser
);

module.exports = router;
