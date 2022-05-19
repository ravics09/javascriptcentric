const isEmpty = require("is-empty");
const Validator = require("validator");

module.exports = ValidateSigninInput = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is empty";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter Correct email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is Empty";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
