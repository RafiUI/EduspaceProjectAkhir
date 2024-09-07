const express = require("express");
const router = express.Router();

const adminRoute = require("./adminRoutes");
const authRoute = require("./authRoutes");
const transactionRoutes = require("./transactionRoutes");

const tutorController = require("../controllers/tutorController");

const discussRoute = require("./discussionRoutes");
const categoryController = require("../controllers/categoryController");
const userController = require("../controllers/userController");

const { authenticateToken } = require("../middlewares/authMiddleware");
const upload = require("../config/upload");

router.use("/admin", adminRoute);
router.use("/auth", authRoute);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findById);
router.use("/discussion", discussRoute);

router.get("/tutor", tutorController.getAllTutors);
router.get("/tutor/category/:categoryId", tutorController.getTutorByCategory);
router.get("/tutor/:id", tutorController.getTutorById);

router.use("/transaction", transactionRoutes);

router.get("/user/profile", authenticateToken, userController.userProfile);
router.post(
  "/user/profile",
  upload.single("image"),
  authenticateToken,
  userController.updateProfile
);

module.exports = router;
