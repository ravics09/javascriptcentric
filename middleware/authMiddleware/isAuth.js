require("dotenv/config");
const jwt = require("jsonwebtoken");

const isAuth = (request, response, next) => {
  const authHeader = request.get("Authorization");

  if (!authHeader) {
    response.status(401).send("Authentication Required! Please SignIn!!");
  }
  
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, res) => {
    if (err) {
      response.status(401).send("JWT Token Expired");
    } else {
      next();
    }
  });
};

module.exports = { isAuth };
