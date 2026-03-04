const router = require("express").Router();
const { getBooks, getBook, createBook, deleteBook } = require("../controllers/bookController");
const { protect, admin } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/",           protect, getBooks);
router.get("/:id",        protect, getBook);
router.post("/",          protect, admin, upload.single("pdf"), createBook);
router.delete("/:id",     protect, admin, deleteBook);

module.exports = router;