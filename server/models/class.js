const { Schema, model } = require("mongoose");

const classModel = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la clase es obligatorio"],
    },
    //Para eventos de 1 sola vez
    date: {
      type: Date,
      required: [false, "La fecha y hora es obligatoria"],
    },
    place: {
      type: Schema.Types.ObjectId,
      required: [true, "Indica el laboratorio de la clase"],
      ref: "Laboratory",
    },
    status: {
      type: Boolean,
      default: true,
    },
    free: {
      type: Boolean,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      required: [true, "El profesor de la clase es obligatorio"],
      ref: "User",
    },
    type: {
      type: String,
      enum: ["EXAM", "CLASS", "COURSE"],
      required: [true, "El tipo de clase es obligatorio"],
    },
    authorized: {
      type: Boolean,
      default: false,
    },
    //Para clases recurrentes
    recurrent: {
      type: Boolean,
      default: true,
    },
    repeats: {
      type: [String],
      enum: ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"],
    },
    hour: {
      type: Number,
      min: 7,
      max: 20,
      require: [true, "La clase debe tener una hora"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

classModel.methods.toJSON = function () {
  const { __v, _id, ...clas } = this.toObject();

  clas.id = _id;
  return clas;
};

module.exports = model("Class", classModel);
