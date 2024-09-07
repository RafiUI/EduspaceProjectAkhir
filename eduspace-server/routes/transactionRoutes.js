const express = require("express");
const router = express.Router();
const {
  handleValidationErrors,
} = require("../middlewares/handleValidationError");
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");
const transactionController = require("../controllers/transactionController");
const upload = require("../config/upload");
const { validateBuyTutor } = require("../middlewares/validationMiddleware");

router.get(
  "/purcashed",
  authenticateToken,
  transactionController.getPurchasedTutors
);

router.post(
  "/purchase",
  upload.single("image"),
  authenticateToken,
  validateBuyTutor,
  handleValidationErrors,
  transactionController.buyTutor
);

module.exports = router;
