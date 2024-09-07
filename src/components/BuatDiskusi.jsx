import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance"; // Adjust the path as necessary
import { AuthContext } from "../contexts/AuthProvider";
import LoadingTransisi from "./LoadingTransisi";

const BuatDiskusi = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]); // State to hold categories
  const [discussionName, setDiscussionName] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume true for demo

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (user == null) {
        alert("Harap login terlebih dahulu");
        navigate("/");
      }
      const tokenLocalStorage = localStorage.getItem("token");
      setToken(tokenLocalStorage);
    };

    checkAuth();
  }, [navigate, user]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");
        if (response.data && response.data.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", discussionName);
    formData.append("description", description);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axiosInstance.post("discussion", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Discussion created successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to create discussion:", error);
    }
  };

  if (!isAuthenticated) {
    return <LoadingTransisi />;
  }

  return (
    <div className="section-container py-20">
      <div className="text-center">
        <h2 className="title">Buat Diskusi Baru</h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto py-8">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama Diskusi</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={discussionName}
            onChange={(e) => setDiscussionName(e.target.value)}
            required
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Upload Image</span>
          </label>
          <input
            type="file"
            className="input input-bordered"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Kategori Diskusi</span>
          </label>
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Deskripsi Diskusi</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Buat Diskusi
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuatDiskusi;
