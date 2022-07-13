const express = require("express");
const authRoutes = express.Router();

//***************** Start Schemas *****************
const SignUpSchema = require("./../schema/signUpSchema");
const SignInSchema = require("./../schema/signInSchema");
//***************** End Schemas *****************

//***************** Start Middlewares *****************
const { isAuth } = require("../middleware/authMiddleware/isAuth");
const { signInLimiter } = require("./../middleware/rateLimiter");
const SignUpValidator = require("./../middleware/validatorMiddleware/signUpValidator");
const SignInValidator = require("./../middleware/validatorMiddleware/signInValidator");
// Auth Middleware used to validate jwt token for each request.
// authRoutes.use('*', isAuth);
//***************** End Middlewares *****************

//***************** Start Controllers *****************
const authController = require("./../controllers/authController");
//***************** End Controllers *****************


authRoutes.post("/signup", SignUpValidator(SignUpSchema), signUp);
authRoutes.post("/signin", SignInValidator(SignInSchema), signIn);
authRoutes.post("/googlesignin", googleSignIn);
authRoutes.post("/forgetpassword", signInLimiter, forgetPassword);
authRoutes.get(
  "/validateresetlink/:id/:token",
  signInLimiter,
  validateResetLink
);
// ****** Admin Route Start *******
authRoutes.post("/adminsignin", SignInValidator(SignInSchema), adminSignIn);
// ****** Admin Route End *******

authRoutes.put("/resetpassword/:id", signInLimiter, resetPassword); // Is it secured or not?
authRoutes.all("*", (request, response, next) => {
  const err = new Error(`Can't find ${request.originalUrl} on this server!`);
  err.status = 'Not A Valid Auth Route';
  err.statusCode = 404;
  next(err);
});

function signUp(request, response, next) {
  authController.signUpUser(request, response, next);
}

function signIn(request, response, next) {
  authController.signInUser(request, response, next);
}

function googleSignIn(request, response, next) {
  authController.googleSignInUser(request, response, next);
}

function forgetPassword(request, response, next) {
  authController.forgetPassword(request, response, next);
}

function validateResetLink(request, response, next) {
  authController.validateResetLink(request, response, next);
}

function resetPassword(request, response, next) {
  authController.resetPassword(request, response, next);
}

function adminSignIn(request, response, next) {
  authController.adminSignIn(request, response, next);
}

module.exports = authRoutes;