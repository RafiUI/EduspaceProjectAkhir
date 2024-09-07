const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../config/upload");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/profile", userController.userProfile);


module.exports = router;
