const express = require("express");
const router = express.Router();

//importing controller methods
const { create, list, read, edit, remove } = require("../controllers/book");

router.post("/book", create);
router.get("/books", list);
router.get("/book/:slug", read);
router.put("/book/:slug", edit);
router.delete("/book/:slug", remove);

module.exports = router;
