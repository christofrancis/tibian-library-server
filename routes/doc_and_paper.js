const express = require("express");
const router = express.Router();

//importing controller methods
const {
  create,
  list,
  read,
  edit,
  remove,
} = require("../controllers/doc_and_paper");

router.post("/doc-and-paper", create);
router.get("/docs-and-papers", list);
router.get("/doc-and-paper/:slug", read);
router.put("/doc-and-paper/:slug", edit);
router.delete("/doc-and-paper/:slug", remove);

module.exports = router;
