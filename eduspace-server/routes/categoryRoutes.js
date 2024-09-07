const expres = require("express");

const router = expres.Router();
const categoryController = require("../controllers/categoryController");
const { validateCategory } = require("../middlewares/validationMiddleware");
const {
  handleValidationErrors,
} = require("../middlewares/handleValidationError");

router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findById);
router.put(
  "/:id",
  validateCategory,
  handleValidationErrors,
  categoryController.updateById
);
router.delete("/:id", categoryController.deleteById);
router.post(
  "/",
  validateCategory,
  handleValidationErrors,
  categoryController.add
);

module.exports = router;
