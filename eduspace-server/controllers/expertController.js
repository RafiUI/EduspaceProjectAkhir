const Expert = require("../models/expertModel");
const path = require("path");

// Create new expert with image upload
const createExpert = async (req, res) => {
  const { name, specialization } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.filename;
  }

  try {
    const newExpert = new Expert({
      name,
      image: imagePath ? `/uploads/${imagePath}` : null, // Path to image
      specialization,
    });
    await newExpert.save();
    res.status(201).json(newExpert);
  } catch (error) {
    res.status(500).json({ message: "Error creating expert", error });
  }
};

const updateExpert = async (req, res) => {
  const { id } = req.params;
  const { name, specialization } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.filename;
  }

  try {
    const updatedExpert = await Expert.findByIdAndUpdate(
      id,
      {
        name,
        image: imagePath ? `/uploads/${imagePath}` : undefined,
        specialization,
      },
      { new: true, runValidators: true }
    );
    if (!updatedExpert) {
      return res.status(404).json({ message: "Expert not found" });
    }
    res.status(200).json(updatedExpert);
  } catch (error) {
    res.status(500).json({ message: "Error updating expert", error });
  }
};

const getAllExperts = async (req, res) => {
  try {
    const experts = await Expert.find();
    res
      .status(200)
      .json({ data: experts, message: "success fetch data experts" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching experts", error });
  }
};

const deleteExpert = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpert = await Expert.findByIdAndDelete(id);
    if (!deletedExpert) {
      return res.status(404).json({ message: "Expert not found" });
    }
    res.status(200).json({ message: "Expert deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expert", error });
  }
};

// Get expert by ID
const getExpertById = async (req, res) => {
  const { id } = req.params;
  try {
    const expert = await Expert.findById(id);
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }
    res.status(200).json({ data: expert, message: "success get expert" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching expert", error });
  }
};

module.exports = {
  getAllExperts,
  getExpertById,
  createExpert,
  deleteExpert,
  updateExpert,
};
