const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.login = (req, res) => {
  const { password } = req.body;
  const name = "user";
  if (password === process.env.PASSWORD_ADMIN) {
    //generate ADMIN's token and send with user's name to client
    const adminToken = jwt.sign({ name }, process.env.JWT_SECRET_ADMIN, {
      expiresIn: "60s",
    });
    return res.json({ adminToken, name });
  } else {
    return res.status(400).json({
      error: "Niewłaściwe hasło",
    });
  }
};
