import React, { useState, useEffect } from "react";
import axiosinstance from "../../../axiosInstance";

const TutorAdmin = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    jadwal: "",
    price: "",
    expert: "",
    category: "",
    image: null,
    facilities: [],
    parts: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [experts, setExperts] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [newFacility, setNewFacility] = useState("");
  const [newPart, setNewPart] = useState("");
  const [editingTutorId, setEditingTutorId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch categories
    axiosinstance
      .get("admin/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

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

    // Fetch tutors
    axiosinstance
      .get("admin/tutor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTutors(response.data.data);
      })
      .catch((error) => console.error("Error fetching tutors:", error));
  }, [token]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddFacility = () => {
    if (newFacility.trim() === "") return;
    setForm((prevForm) => ({
      ...prevForm,
      facilities: [...prevForm.facilities, newFacility],
    }));
    setNewFacility("");
  };

  const handleAddPart = () => {
    if (newPart.trim() === "") return;
    setForm((prevForm) => ({
      ...prevForm,
      parts: [...prevForm.parts, newPart],
    }));
    setNewPart("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAdd = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("jadwal", form.jadwal);
    formData.append("price", form.price);
    formData.append("expert", form.expert);
    formData.append("category", form.category);
    formData.append("image", form.image);
    form.facilities.forEach((facility) =>
      formData.append("facilities[]", facility)
    );
    form.parts.forEach((part) => formData.append("parts[]", part));

    const request = editingTutorId
      ? axiosinstance.put(`admin/tutor/${editingTutorId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
      : axiosinstance.post("admin/tutor", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

    request
      .then((response) => {
        setShowForm(false);
        setForm({
          title: "",
          description: "",
          jadwal: "",
          price: "",
          expert: "",
          category: "",
          image: null,
          facilities: [],
          parts: [],
        });
        setImagePreview(null);
        setEditingTutorId(null);
        location.reload();
      })
      .catch((error) => {
        console.error("Error adding/updating tutor:", error);
      });
  };

  const handleEdit = (tutor) => {
    setForm({
      title: tutor.title,
      description: tutor.description,
      jadwal: tutor.jadwal,
      price: tutor.price,
      expert: tutor.expert,
      category: tutor.category,
      image: null,
      facilities: tutor.facilities,
      parts: tutor.parts,
    });
    setImagePreview(tutor.image ? `http://localhost:5000${tutor.image}` : null);
    setEditingTutorId(tutor._id);
    setShowForm(true);
  };

  const handleDelete = (tutorId) => {
    if (window.confirm("Are you sure you want to delete this tutor?")) {
      axiosinstance
        .delete(`admin/tutor/${tutorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          location.reload();
        })
        .catch((error) => {
          console.error("Error deleting tutor:", error);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tutor Admin</h2>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowForm(true)}
      >
        {editingTutorId ? "Edit Tutor" : "Add New Tutor"}
      </button>

      {showForm && (
        <div className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-bold mb-2">
            {editingTutorId ? "Edit Tutor" : "Add New Tutor"}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
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
            <input
              type="text"
              name="jadwal"
              value={form.jadwal}
              onChange={handleFormChange}
              placeholder="Jadwal"
              className="input mb-2 w-full"
              required
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleFormChange}
              placeholder="Price"
              className="input mb-2 w-full"
              required
            />
            <select
              name="expert"
              value={form.expert}
              onChange={handleFormChange}
              className="input mb-2 w-full"
              required
            >
              <option value="">Select Expert</option>
              {experts.map((expert) => (
                <option key={expert._id} value={expert._id}>
                  {expert.name}
                </option>
              ))}
            </select>
            <select
              name="category"
              value={form.category}
              onChange={handleFormChange}
              className="input mb-2 w-full"
              required
            >
              <option value="">Select Category</option>
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
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              placeholder="New Facility"
              className="input mb-2 w-full"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              className="btn btn-secondary mb-2"
            >
              Add Facility
            </button>
            <input
              type="text"
              value={newPart}
              onChange={(e) => setNewPart(e.target.value)}
              placeholder="New Part"
              className="input mb-2 w-full"
            />
            <button
              type="button"
              onClick={handleAddPart}
              className="btn btn-secondary mb-2"
            >
              Add Part
            </button>
            <div className="mb-2">
              <h4 className="font-bold">Facilities:</h4>
              <ul>
                {form.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <h4 className="font-bold">Parts:</h4>
              <ul>
                {form.parts.map((part, index) => (
                  <li key={index}>{part}</li>
                ))}
              </ul>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingTutorId ? "Update Tutor" : "Add Tutor"}
            </button>
          </form>
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold mb-2">Tutor List</h3>
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Jadwal</th>
              <th>Price</th>
              <th>Expert</th>
              <th>Category</th>
              <th>Facilities</th>
              <th>Parts</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor) => (
              <tr key={tutor._id}>
                <td>{tutor.title}</td>
                <td>{tutor.description}</td>
                <td>{tutor.jadwal}</td>
                <td>{tutor.price}</td>
                <td>{tutor.expert.name}</td>
                <td>{tutor.category.name}</td>
                <td>{tutor.facilities.join(", ")}</td>
                <td>{tutor.parts.join(", ")}</td>
                <td>
                  <button
                    onClick={() => handleEdit(tutor)}
                    className="btn btn-secondary mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tutor._id)}
                    className="btn btn-danger"
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

export default TutorAdmin;
