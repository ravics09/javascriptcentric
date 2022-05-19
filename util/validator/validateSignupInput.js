const isEmpty = require("is-empty");
const Validator = require("validator");

module.exports = ValidateSignupInput = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is Empty";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter a correct Email ";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password filed cannot be empty";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must contain 6-20 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
