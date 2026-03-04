const router = require("express").Router();
const { getStories, getStory, createStory } = require("../controllers/storyController");
const { protect, admin } = require("../middleware/auth");

router.get("/",        protect, getStories);
router.get("/:id",     protect, getStory);
router.post("/",       protect, admin, createStory);

module.exports = router;