const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre del rol es obligatorio"],
  },
});

roleSchema.methods.toJSON = function () {
  const { __v, _id, ...role } = this.toObject();

  return role;
};

module.exports = model("Role", roleSchema);
