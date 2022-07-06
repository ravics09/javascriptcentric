const SignInValidator = (schema) => async (req, res, next) => {
  try {
    const userData = req.body;
    await schema.validateAsync(userData, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ message: err.details[0].message });
  }
};

module.exports = SignInValidator;