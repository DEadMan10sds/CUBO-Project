const { Schema, model, Model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    surname: {
      type: String,
      required: [true, "Los apellidos son obligatorios"],
    },
    uniKey: {
      type: Number,
      required: [true, "La clave única es obligatoria"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    status: {
      type: Boolean,
      required: [true, "El estado del usuario es obligatorio"],
      default: true,
    },
    /*img: {
      type: String,
    },*/
    role: {
      type: String,
      required: true,
      default: "ALUMNO",
      enum: ["ADMIN", "BECARIO", "PROFESOR", "ALUMNO"],
    },
  },
  {
    //Opciones de creación del modelo
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();

  user.id = _id;
  return user;
};

module.exports = model("User", userSchema);
