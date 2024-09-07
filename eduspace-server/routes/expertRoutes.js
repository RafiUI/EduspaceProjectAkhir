const express = require("express");
const expertController = require("../controllers/expertController");
const { validateExpertUpload } = require("../middlewares/validationMiddleware");
const {
  handleValidationErrors,
} = require("../middlewares/handleValidationError");

const upload = require("../config/upload");
const router = express.Router();

router.get("/", expertController.getAllExperts);
router.get("/:id", expertController.getExpertById);

// Route with multer for image upload
router.post(
  "/",
  upload.single("image"),
  validateExpertUpload,
  handleValidationErrors,
  expertController.createExpert
);
router.put("/:id", upload.single("image"), expertController.updateExpert);

router.delete("/:id", expertController.deleteExpert);

module.exports = router;
