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
      //maxItems: 10,
    },
  ],
});

laboratoryModel.methods.toJSON = function () {
  const { __v, _id, ...labData } = this.toObject();
  labData.id = _id;
  return labData;
};

module.exports = model("Laboratory", laboratoryModel);
