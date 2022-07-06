const bcrypt = require("bcryptjs");

const hashed = async (input) => {
  try {
    let hashed = await bcrypt.hash(input, 12);
    return hashed;
  } catch (err) {
    return err;
  }
};

const compare = async (input, hash) => {
  try {
    let result = await bcrypt.compare(input, hash);
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  hashed,
  compare,
};
