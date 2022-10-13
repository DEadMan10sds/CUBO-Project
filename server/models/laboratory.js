const { Schema, model } = require("mongoose");

const laboratoryModel = new Schema({
  name: {
    type: String,
    required: [true, "El nombre del laboratorio es obligatorio"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "class",
    },
  ],
});

laboratoryModel.methods.toJSON = function () {
  const { __v, ...labData } = this.toObject();

  return labData;
};

module.exports = model("Laboratory", laboratoryModel);
