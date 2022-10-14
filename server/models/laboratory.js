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
  classes: {
    type: [Schema.Types.ObjectId],
    validate: [arrayLimit, "{PATH} exeeds the classes allowed"],
    ref: "class",
  },
  hours: {
    type: [
      {
        type: Number,
        min: 7,
        max: 20,
      },
    ],
    validate: [arrayLimit, "{PATH} exeeds the hours allowed"],
  },
});

function arrayLimit(arrayLenght) {
  return arrayLenght.length <= 14;
}

laboratoryModel.methods.toJSON = function () {
  const { __v, _id, ...labData } = this.toObject();
  labData.id = _id;
  return labData;
};

module.exports = model("Laboratory", laboratoryModel);
