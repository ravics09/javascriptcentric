const SignUpValidator = (schema) => async (req, res, next) => {
  try {
    const userData = req.body;
    await schema.validateAsync(userData, { abortEarly: false });
    next();
  } catch (err) {
    err.status = "ConfirmPasswordNotMatch";
    return next(err);
  }
};

module.exports = SignUpValidator;
