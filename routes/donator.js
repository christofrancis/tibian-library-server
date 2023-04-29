const express = require("express");
const router = express.Router();

//importing controller methods
const { create, list, read, edit, remove } = require("../controllers/donator");

router.post("/donator", create);
router.get("/donators", list);
router.get("/donator/:slug", read);
router.put("/donator/:slug", edit);
router.delete("/donator/:slug", remove);

module.exports = router;
