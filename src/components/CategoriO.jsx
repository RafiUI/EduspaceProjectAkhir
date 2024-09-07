import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance"; // Adjust path as necessary

const CategoriO = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axiosInstance.get("discussion");
        const discussionsData = response.data.data;

        // Extract unique categories from discussions
        const uniqueCategories = [
          "All",
          ...new Set(
            discussionsData.map((discussion) => discussion.category.name)
          ),
        ];

        setDiscussions(discussionsData);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch discussions:", error);
      }
    };

    fetchDiscussions();
  }, []);

  const filteredCards =
    selectedCategory === "All"
      ? discussions.filter((discussion) =>
          discussion.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : discussions.filter(
          (discussion) =>
            discussion.category.name === selectedCategory &&
            discussion.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="section-container py-16">
      <div className="text-center">
        <h2 className="title">Open Discuss</h2>
        <p className="subtitle">
          Diskusikan banyak hal dengan orang-orang agar kamu dapat menemukan
          jawabannya.
        </p>
      </div>

      {/* search bar diskusi */}
      <div className="flex justify-center py-8">
        <div className="join flex flex-wrap items-center">
          <div>
            <input
              className="input input-bordered join-item"
              style={{ width: "380px" }}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">new</span>
            <Link to="/BuatDiskusi">
              <button className="btn join-item">
                <IoMdAdd /> Buat Diskusi
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Kategori link */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center space-x-4">
          {categories.map((category) => (
            <div key={category} className="category-box">
              <button
                className={`category-link ${
                  selectedCategory === category
                    ? "text-primary font-bold underline"
                    : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery(""); // Clear search query when switching categories
                }}
              >
                {category}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Kategori card */}
      <div className="flex flex-wrap justify-center gap-8 py-8">
        {filteredCards.map((discussion) => (
          <div
            key={discussion._id}
            className="card card-compact bg-base-100 w-96 shadow-xl"
          >
            <figure className="h-48 w-full overflow-hidden">
              <img
                className="w-full h-full"
                src={
                  discussion.image
                    ? `http://localhost:5000${discussion.image}`
                    : "default-image.png"
                } // Handle default image if null
                alt={discussion.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{discussion.title}</h2>
              <p>{discussion.description}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/diskusi/${discussion._id}`, {
                      state: { discussion },
                    })
                  }
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriO;
