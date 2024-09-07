import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance"; // Ganti dengan path yang sesuai

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("admin/category");
        setCategories(response.data.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  // Open modal for add or edit
  const handleShow = (category = null) => {
    setIsEdit(!!category);
    setSelectedCategory(category);
    setNewCategoryName(category ? category.name : "");
    setShow(true);
  };

  // Close modal
  const handleClose = () => {
    setShow(false);
    setSelectedCategory(null);
    setNewCategoryName("");
  };

  // Handle add or edit submission
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        // Edit category
        await axiosInstance.put(`admin/category/${selectedCategory._id}`, {
          name: newCategoryName,
        });
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === selectedCategory.id
              ? { ...cat, name: newCategoryName }
              : cat
          )
        );
      } else {
        // Add new category
        const response = await axiosInstance.post("admin/category", {
          name: newCategoryName,
        });
        setCategories([...categories, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving category", error);
    }
  };

  // Delete category
  const handleDelete = async (categoryId) => {
    try {
      await axiosInstance.delete(`admin/category/${categoryId}`);
      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>
      <button
        onClick={() => handleShow()}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Category
      </button>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleShow(category)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black opacity-50 absolute inset-0"
            onClick={handleClose}
          />
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative z-10">
            <h3 className="text-xl font-semibold mb-4">
              {isEdit ? "Edit Category" : "Add Category"}
            </h3>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded bg-red-600"
              >
                {isEdit ? "Save Changes" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
