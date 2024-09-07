const express = require("express");

const discussionController = require("../controllers/discussionController");
const { route } = require("./userRoutes");

const router = express.Router();



router.get("/", discussionController.getAllDiscussions);
router.get("/:id", discussionController.getDiscussionById);
router.post("/" ,discussionController.createDiscussion);
router.delete("/:id", discussionController.deleteDiscussion);
router.put("/:id", discussionController.updateDiscussion);

module.exports = router
