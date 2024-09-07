import React, { useState, useEffect } from "react";
import axiosinstance from "../../../axiosInstance";

const OpenAdmin = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [categories, setCategories] = useState([]); // Add state to store categories
  const [editingDiscussId, setEditingDiscussId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch discussions
    axiosinstance
      .get("admin/discussions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDiscussions(response.data.data);
      })
      .catch((error) => console.error("Error fetching discussions:", error));

    // Fetch categories
    axiosinstance
      .get("admin/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data.data); // Store categories in state
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [token]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddOrUpdate = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category); // Use selected category ID
    formData.append("image", form.image);

    const request = editingDiscussId
      ? axiosinstance.put(`discussion/${editingDiscussId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
      : axiosinstance.post("discussion", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

    request
      .then(() => {
        setShowForm(false);
        setForm({
          title: "",
          description: "",
          category: "",
          image: null,
        });
        setImagePreview(null);
        setEditingDiscussId(null);
        location.reload(); // Reload to update discussion list
      })
      .catch((error) => {
        console.error("Error adding/updating discussion:", error);
      });
  };

  const handleEdit = (discuss) => {
    setForm({
      title: discuss.title,
      description: discuss.description,
      category: discuss.category._id, // Set the category by ID
      image: null,
    });
    setImagePreview(
      discuss.image ? `http://localhost:5000${discuss.image}` : null
    );
    setEditingDiscussId(discuss._id);
    setShowForm(true);
  };

  const handleDelete = (discussId) => {
    if (window.confirm("Are you sure you want to delete this discussion?")) {
      axiosinstance
        .delete(`admin/discussions/${discussId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.error("Error deleting discussion:", error);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Discussions</h2>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowForm(true)}
      >
        {editingDiscussId ? "Edit Discussion" : "Add New Discussion"}
      </button>

      {showForm && (
        <div className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-bold mb-2">
            {editingDiscussId ? "Edit Discussion" : "Add New Discussion"}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddOrUpdate();
            }}
          >
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              placeholder="Title"
              className="input mb-2 w-full"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Description"
              className="input mb-2 w-full"
              required
            />
            {/* Category select dropdown */}
            <select
              name="category"
              value={form.category}
              onChange={handleFormChange}
              className="input mb-2 w-full"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={handleFileChange}
              className="input mb-2 w-full"
            />
            {imagePreview && (
              <div className="mb-2">
                <img src={imagePreview} alt="Preview" width="100" />
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              {editingDiscussId ? "Update Discussion" : "Add Discussion"}
            </button>
          </form>
        </div>
      )}

      {/* Discussions Table */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Existing Discussions</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {discussions.map((discuss) => (
              <tr key={discuss._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {discuss.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {discuss.category?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img
                    src={"http://localhost:5000" + discuss.image}
                    className="rounded-md"
                    alt={discuss.title}
                    width="100"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => handleEdit(discuss)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(discuss._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpenAdmin;
