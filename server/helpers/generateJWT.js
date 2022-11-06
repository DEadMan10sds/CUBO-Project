const jwt = require("jsonwebtoken");

const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(payload, process.env.SECRETKEY, (err, token) => {
      if (err) {
        console.log(err);
        reject("El token no se pudo generar");
      } else resolve(token);
    });
  });
};

module.exports = {
  generateJWT,
};
