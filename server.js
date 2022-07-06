require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const err = new Error();

const ErrorHandlerMiddleware = require("./middleware/errorHandlerMiddleware/errorHandler");

// ***** Connect with mongodb atlas *****
const connectDatabase = require("./database/connectDatabase");
connectDatabase();

// ***** Use Middlewares in our app *****
app.use(cors());

// ***** You can also enable pre-flight across-the-board like so: *****
app.options('*', cors()) // include before other routes
app.use(helmet());
app.use(compression());
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// ***** import routers *****
app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/feed", require("./routers/feedRouter"));
app.use("/other", require("./routers/contactUsRouter"));
app.all('*', (req, res, next) => {
  err.status = "PageNotFound";
  next(err);
});

// ***** Error Handler *****
app.use(ErrorHandlerMiddleware);

app.listen(process.env.PORT, (err, res) => {
  if (err) {
    console.log(`Error while running server `, err);
    return err;
  }
  console.log(`JavaScript Centric Server running on ${process.env.PORT}`);
});