const Category = require("../models/categoryModel");

const add = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
    });
    return res.status(201).json({ message: "success add category" });
  } catch (error) {
    return res.status(500).json({ message: error.errmsg });
  }
};

const findAll = async (req, res) => {
  const categories = await Category.find();

  return res.json({ message: "success fetch categories", data: categories });
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      _id: req.params.id,
    });

    return res
      .status(200)
      .json({ message: "success get category", data: category });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "category not found",
      data: null,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const isDelete = await Category.findByIdAndDelete(id);
    return res.status(200).json({ message: "success delete category" });
  } catch (error) {
    return res.status(500).json({ message: error.errmsg });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(id, {
      name,
    });
    return res.status(200).json({ message: "success update category" });
  } catch (error) {
    return res.status().json({ message: error.errmsg });
  }
};

module.exports = {
  findById,
  findAll,
  add,
  deleteById,
  updateById,
};
