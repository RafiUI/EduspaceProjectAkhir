import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance"; // Import your Axios instance
import { useNavigate } from "react-router-dom";

const MyDiscussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDiscussions = async () => {
      try {
        const response = await axiosInstance.get(
          "discussion/purchased/active",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDiscussions(response.data.data); // Assuming 'data' contains the discussions array
        setLoading(false);
      } catch (error) {
        setError("Gagal mengambil diskusi");
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="section-container py-20">
      <h2 className="text-2xl font-bold mb-8">Diskusi Saya</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {discussions.length > 0 ? (
          discussions.map((discussion, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                className="w-full h-40 object-cover mb-4 rounded-md"
                src={"http://localhost:5000" + discussion.image} // Ensure the correct URL for the image
                alt={discussion.title}
              />
              <h3 className="text-xl font-semibold">{discussion.title}</h3>
              <p className="text-sm text-gray-600">
                {discussion.category.name}
              </p>
              <p className="text-gray-700 mt-2">{discussion.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  {discussion.users.length} peserta
                </p>
                <button
                  onClick={() =>
                    navigate(`/diskusi/${discussion._id}`, {
                      state: { discussion },
                    })
                  }
                  className="btn btn-primary"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada diskusi yang dibuat.</p>
        )}
      </div>
    </div>
  );
};

export default MyDiscussion;
