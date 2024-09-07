import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const MyClass = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState(0);
  const [purchasedClasses, setPurchasedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error handling state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axiosInstance.get("transaction/purcashed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const purchasedTutors = response.data.data;

        if (purchasedTutors.length === 0) {
          setError("No purchased classes available");
          setLoading(false);
          return;
        }

        // Set the purchased classes, including their parts
        setPurchasedClasses(purchasedTutors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Include an empty dependency array to ensure it runs once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handlePartClick = (index) => {
    setSelectedPart(index);
  };

  return purchasedClasses.map((e, classIndex) => (
    <div
      key={classIndex}
      className="section-container py-24 flex flex-col md:flex-row gap-8"
    >
      {/* Left Section: Video and Description */}
      <div className="flex-1">
        <div className="bg-gray-200 h-100 w-full overflow-hidden mb-4 rounded-lg">
          {e.status === "accept" ? (
            <video
              key={selectedPart}
              controls
              className="w-full h-full rounded-md"
            >
              <source
                src={`/KelasVideo/${selectedPart + 1}.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-md">
              <p className="text-gray-700 text-center">
                Video belum bisa diakses, admin belum menyetujui pembayaran kamu
              </p>
            </div>
          )}
        </div>
        <div className="px-4">
          <h3 className="text-2xl font-bold">{e.tutor.title}</h3>
          <p className="text-gray-700 mt-2">{e.tutor.description}</p>
        </div>
      </div>

      {/* Right Section: Class Material */}
      <div className="w-full md:w-80 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{e.tutor.title}</h2>
        <ul className="space-y-2">
          {e.tutor.parts.map((part, index) => (
            <li key={index} className="cursor-pointer">
              <div
                className={`p-2 rounded-md ${
                  index === selectedPart ? "bg-gray-200" : ""
                }`}
                onClick={() => handlePartClick(index)}
              >
                {part} {/* Display each part */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ));
};

export default MyClass;
