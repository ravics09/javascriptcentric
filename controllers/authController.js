require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const BaseURL = "http://localhost:3000";

const User = require("./../models/userModel");
const Token = require("./../models/tokenModel");
const BcryptHelper = require("./../util/bcryptHelper");

async function signUpUser(request, response, next) {
  const { email, fullName, password } = request.body;
  const isUserExist = await User.findOne({ email: email });
  const err = new Error();
  if (isUserExist) {
    err.status = "UserConflict";
    return next(err);
  }

  let newUser = new User();
  let passwordHash = await BcryptHelper.hashed(password);
  newUser.fullName = fullName;
  newUser.email = email;
  newUser.hash = passwordHash;

  newUser.save((err, data) => {
    if (err) {
      err.status = "InternalServerError";
      return next(err);
    } else {
      response.status(200).json({
        message: "You have signed up successfully. Please sign in!!",
      });
    }
  });
}

async function signInUser(request, response, next) {
  const { email, password } = request.body;
  const user = await User.findOne({ email: email });
  const err = new Error();
  if (!user) {
    err.status = "UserNotExist";
    return next(err);
  }

  let isPasswordMatched = await BcryptHelper.compare(password, user.hash);
  if (!isPasswordMatched) {
    err.status = "PasswordMismatch";
    return next(err);
  }

  let readIdList = user.readingList.map((item) => item.postId);
  const customResponse = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePhoto: user.profilePhoto,
    readingList: readIdList,
  };

  const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRE_IN,
  });

  response.status(200).json({
    accessToken: token,
    user: customResponse,
  });
}

async function googleSignInUser(request, response, next) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { idToken } = request.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then(async (res) => {
      const { email_verified, name, email } = res.payload;
      if (!email_verified) {
        return res.status(400).json({
          error: "Google signin failed. Please try again!",
        });
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        let newUser = new User();
        let password = email + process.env.SECRET_KEY;
        let passwordHash = await BcryptHelper.hashed(password);
        newUser.fullName = name;
        newUser.email = email;
        newUser.hash = passwordHash;

        newUser.save((err, data) => {
          if (err) {
            response.status(500).json({
              message:
                "SignUp with google data is failed due to some technical issue",
            });
          } else {
            const { _id, email, fullName } = data;
            const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
              expiresIn: process.env.EXPIRE_IN,
            });

            return response.status(200).json({
              accessToken: token,
              user: { _id, email, fullName },
            });
          }
        });
      } else {
        const { _id, email, fullName } = user;
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
          expiresIn: process.env.EXPIRE_IN,
        });

        response.status(200).json({
          accessToken: token,
          user: { _id, email, fullName },
        });
      }
    });
}

async function forgetPassword(request, response, next) {
  const { email } = request.body;
  if (email === "") {
    response.status(400).send("Email Address Required..");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    response.status(403).json({
      message: `User Not Registered With This Email`,
    });
  } else {
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(20).toString("hex"),
      }).save();

      const resetLink = `${BaseURL}/resetpassword/${user._id}/${token.token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 587,
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: "ravisharmacs09@gmail.com",
        to: `${user.email}`,
        subject: "Link To Reset Password",
        text:
          `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please lick on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
          `${resetLink}` +
          `\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (error, res) => {
        if (error) {
          response.status(500).json({
            message: `Error While Sending Password Reset Link`,
          });
        } else {
          response.status(200).json({
            message: `Password reset link sent to your registered email address ${user.email}`,
          });
        }
      });
    }
  }
}

async function resetPassword(request, response, next) {
  const { password } = request.body;
  const { id } = request.params;

  const user = await User.findById(id);
  if (!user) {
    response.status(400).send("User doesn't exist.");
  } else if (password) {
    bcrypt.hash(password, 12, (err, passwordHash) => {
      if (err) {
        return response
          .status(500)
          .json({ message: "couldn't hash the password" });
      } else if (passwordHash) {
        user.hash = passwordHash;
        user.save();
        response.status(200).json({
          message: "Password Updated successfully from backend.",
          statusCode: 200,
        });
      }
    });
  }
}

async function validateResetLink(request, response) {
  const { id, token } = request.params;
  const user = await User.findById(id);
  const err = new Error();
  if (!user) {
    err.status = "UserNotExist";
    return next(err);
  }

  const tok = await Token.findOne({
    userId: user._id,
    token: token,
  });

  if (tok) {
    await user.save();
    await tok.delete();
    response.status(200).send("Reset Link Is-Ok");
  } else response.status(400).send("Invalid Link Or Link Expired");
}

module.exports = {
  signInUser,
  googleSignInUser,
  signUpUser,
  forgetPassword,
  resetPassword,
  validateResetLink,
};
