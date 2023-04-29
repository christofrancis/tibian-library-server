const express = require("express");
const router = express.Router();

//importing controller methods
const { login } = require("../controllers/authorization");

router.post("/login", login);

module.exports = router;
