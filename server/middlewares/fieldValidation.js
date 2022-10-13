const { validationResult } = require("express-validator");

const fieldValidation = (req = Request, res = Response, next) => {
  const bodyErrors = validationResult(req);
  if (!bodyErrors.isEmpty()) return res.status(400).json(bodyErrors);

  next();
};

module.exports = {
  fieldValidation,
};
