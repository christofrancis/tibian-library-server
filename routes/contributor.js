const express = require("express");
const router = express.Router();

//importing controller methods
const {
  create,
  list,
  read,
  edit,
  remove,
} = require("../controllers/contributor");

router.post("/contributor", create);
router.get("/contributors", list);
router.get("/contributor/:slug", read);
router.put("/contributor/:slug", edit);
router.delete("/contributor/:slug", remove);

module.exports = router;
