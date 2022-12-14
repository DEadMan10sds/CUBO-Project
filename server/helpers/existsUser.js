const { User } = require("../models");

const existUser = async (dataUser = {}) => {
  const result = await User.findOne({
    $or: [{ uniKey: dataUser.uniKey }, { email: dataUser.email }],
  });

  if (result) return result;

  return false;
};

module.exports = {
  existUser,
};
