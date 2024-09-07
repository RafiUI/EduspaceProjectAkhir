const express = require("express");
const tutorController = require("../controllers/tutorController");
const { validateTutorUpload } = require("../middlewares/validationMiddleware");
const {
  handleValidationErrors,
} = require("../middlewares/handleValidationError");

const upload = require("../config/upload");
const router = express.Router();

router.get("/", tutorController.getAllTutors);
router.get("/:id", tutorController.getTutorById);

// Route with multer for image upload
router.post(
  "/",
  upload.single("image"),
  validateTutorUpload,
  handleValidationErrors,
  tutorController.createTutor
);
router.put("/:id", upload.single("image"), tutorController.updateTutor);

router.delete("/:id", tutorController.deleteTutor);

module.exports = router;
