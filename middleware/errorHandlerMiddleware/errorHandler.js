let errorObject = {
  BadRequest: {
    status: 400,
    message: "Bad Request",
  },
  PasswordMismatch: {
    status: 400,
    message: "Invalid Credentials! Please try again.",
  },
  ConfirmPasswordNotMatch: {
    status: 400,
    message: "Confirm password and password must be same",
  },
  UnAuthorized: {
    status: 401,
    message: "Un Authorized User, Please Sign In...",
  },
  UserNotExist: {
    status: 404,
    message: "User Not Exist",
  },
  UserConflict:{
    status: 409,
    message: "User already registered, Please Sign In...",
  },
  TooManyRequests:{
    status: 429,
    message: "Too Many Requests",
  },
  PageNotFound: {
    status: 404,
    message: "Page Not Found",
  },
  InternalServerError: {
    status: 500,
    message: "Internal Server Error",
  }
};

const sendErrorDev = (err, res) => {
  return res
    .status(errorObject[err.status].status)
    .json(errorObject[err.status]);
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error
  } else {
    // 1) Log error
    console.error("ERROR 💥: ", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
  next();
};

module.exports = ErrorHandlerMiddleware;
