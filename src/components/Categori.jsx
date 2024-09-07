// src/components/Categori.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance"; // Import the Axios instance
import { Link } from "react-router-dom";

const Categori = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories and tutors from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, tutorsResponse] = await Promise.all([
          axiosInstance.get("category"),
          axiosInstance.get("tutor"),
        ]);

        setCategories([{ name: "All" }, ...categoriesResponse.data.data]);
        setTutors(tutorsResponse.data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter tutors based on selected category
  const filteredTutors =
    selectedCategory == "All"
      ? tutors
      : tutors.filter((tutor) => tutor.category.name === selectedCategory);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="section-container py-16">
      <div className="text-center">
        <h2 className="title">Tutor With Expert</h2>
        <p className="subtitle">
          Mari upgrade skill mu dengan dibimbing oleh para mentor yang siap
          membantumu!
        </p>
      </div>

      {/* kategori link */}
      <div className="flex justify-center py-8">
        <div className="flex flex-wrap justify-center space-x-4">
          {categories.map((category) => (
            <div key={category.name} className="category-box">
              <a
                href="#"
                className={`category-link ${
                  selectedCategory === category.name
                    ? "text-primary font-bold underline"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(category.name);
                }}
              >
                {category.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* kategori card */}
      <div className="flex flex-wrap justify-center gap-8 py-8">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="card card-compact bg-base-100 w-96 shadow-xl"
            >
              <figure className="h-48 w-full overflow-hidden">
                <img
                  className="w-full h-full"
                  src={
                    tutor.image
                      ? `http://localhost:5000${tutor.image}`
                      : "default-image.png"
                  } // Handle default image if null
                  alt={tutor.title}
                />
              </figure>
              <div className="card-body min-h-40 flex flex-col justify-between">
                <div>
                  <h2 className="card-title">{tutor.title}</h2>
                  <p>{tutor.description}</p>
                  <p>
                    <strong>Schedule:</strong> {tutor.jadwal}
                  </p>
                  <p>
                    <strong>Price:</strong> Rp{tutor.price.toLocaleString()}
                  </p>
                  <p>
                    <strong>Facilities:</strong> {tutor.facilities.join(", ")}
                  </p>
                </div>
                <div className="card-actions justify-end">
                  <Link
                    to={`/KelasDetail/${encodeURIComponent(tutor._id)}`}
                    className="btn btn-primary"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tutors available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Categori;
