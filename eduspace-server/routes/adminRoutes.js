const express = require("express");
const router = express.Router();
const userRouter = require("./userRoutes");
const categoryRouter = require("./categoryRoutes");
const expertRouter = require("./expertRoutes");
const tutorRouter = require("./tutorRoutes");
const discussionAdminRoutes = require("./discussionAdminRoutes");

const {
  validateStatusTransaction,
} = require("../middlewares/validationMiddleware");
const {
  handleValidationErrors,
} = require("../middlewares/handleValidationError");

const transactionController = require("../controllers/transactionController");

const adminMiddleware = require("../middlewares/authMiddleware");
router.use(adminMiddleware.authenticateToken);
router.use(adminMiddleware.isAdmin);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/expert", expertRouter);
router.use("/tutor", tutorRouter);
router.get("/transactions", transactionController.getTransactionsByStatus);
router.put(
  "/transactions",
  validateStatusTransaction,
  handleValidationErrors,
  transactionController.validatePurchase
);

router.use("/discussions", discussionAdminRoutes);

module.exports = router;
