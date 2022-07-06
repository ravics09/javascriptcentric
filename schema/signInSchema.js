const Joi = require("joi");

const SignInSchema = Joi.object().keys({
  email: Joi.string().trim().email().required().label('Email'),
  password: Joi.string().trim().required().label('Password')
});

module.exports = SignInSchema;

