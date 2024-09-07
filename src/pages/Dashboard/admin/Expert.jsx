import React, { useState, useEffect } from "react";
import axiosinstance from "../../../axiosInstance";

const ExpertAdmin = () => {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [experts, setExperts] = useState([]);
  const [editingExpertId, setEditingExpertId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch experts
    axiosinstance
      .get("admin/expert", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExperts(response.data.data);
      })
      .catch((error) => console.error("Error fetching experts:", error));
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

  const handleAdd = () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("specialization", form.specialization);
    formData.append("image", form.image);

    const request = editingExpertId
      ? axiosinstance.put(`admin/expert/${editingExpertId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
      : axiosinstance.post("admin/expert", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

    request
      .then((response) => {
        setShowForm(false);
        setForm({
          name: "",
          specialization: "",
          image: null,
        });
        setImagePreview(null);
        setEditingExpertId(null);
        location.reload();
      })
      .catch((error) => {
        console.error("Error adding/updating expert:", error);
      });
  };

  const handleEdit = (expert) => {
    setForm({
      name: expert.name,
      specialization: expert.specialization,
      image: null,
    });
    setImagePreview(
      expert.image ? `http://localhost:5000${expert.image}` : null
    );
    setEditingExpertId(expert._id);
    setShowForm(true);
  };

  const handleDelete = (expertId) => {
    if (window.confirm("Are you sure you want to delete this expert?")) {
      axiosinstance
        .delete(`admin/expert/${expertId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          location.reload();
        })
        .catch((error) => {
          console.error("Error deleting expert:", error);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Expert Admin</h2>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowForm(true)}
      >
        {editingExpertId ? "Edit Expert" : "Add New Expert"}
      </button>

      {showForm && (
        <div className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-bold mb-2">
            {editingExpertId ? "Edit Expert" : "Add New Expert"}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="Name"
              className="input mb-2 w-full"
              required
            />
            <input
              type="text"
              name="specialization"
              value={form.specialization}
              onChange={handleFormChange}
              placeholder="Specialization"
              className="input mb-2 w-full"
              required
            />
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
              {editingExpertId ? "Update Expert" : "Add Expert"}
            </button>
          </form>
        </div>
      )}

      {/* Experts Table */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Existing Experts</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialization
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
            {experts.map((expert) => (
              <tr key={expert._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expert.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expert.specialization}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img
                    src={"http://localhost:5000" + expert.image}
                    className="rounded-md"
                    alt={expert.name}
                    width="100"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => handleEdit(expert)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(expert._id)}
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

export default ExpertAdmin;
