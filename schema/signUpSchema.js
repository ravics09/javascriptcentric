const Joi = require("joi");

const SignUpSchema = Joi.object().keys({
  fullName: Joi.string().trim().required().label("FullName"),
  // .options({
  //   messages: { "any.only": "Email is required not" },
  // }),
  email: Joi.string().trim().email().required().label("Email"),
  password: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .label("Password"),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({
      messages: { "any.only": "Confirm password and password must be same" },
    })
});

module.exports = SignUpSchema;
