import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance"; // Your custom Axios instance
import { AuthContext } from "../contexts/AuthProvider";

const DiskusiDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to store the discussion data
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserJoined, setIsUserJoined] = useState(false);

  useEffect(() => {
    const fetchDiscussionDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`discussion/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDiscussion(response.data.data);
        setLoading(false);

        // Check if the user is already in the discussion
        const user = localStorage.getItem("user");

        const userJson = JSON.parse(user);
        const userAlreadyJoined = response.data.data.users.some(
          (user) => user.email === userJson.email
        );
        setIsUserJoined(userAlreadyJoined);
      } catch (error) {
        setError("Failed to fetch discussion details");
        setLoading(false);
      }
    };

    fetchDiscussionDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!discussion) return <p>Discussion not found.</p>;

  const handleJoinClick = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        `discussion/${discussion._id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsUserJoined(true); // Update user status to joined

      navigate(`/HalamanDiskusi/${discussion._id}`, {
        state: {
          title: discussion.title,
          participants: discussion.users,
        },
      });
    } catch (error) {
      console.error("Error joining discussion:", error);
    }
  };

  const handleDetailClick = () => {
    navigate(`/HalamanDiskusi/${discussion._id}`, {
      state: {
        title: discussion.title,
        participants: discussion.users,
      },
    });
  };

  return (
    <div className="section-container py-24 flex flex-col md:flex-row gap-8">
      {/* Left Section: Image and Description */}
      <div className="flex-1">
        <div className="bg-gray-200 h-64 md:h-80 w-full overflow-hidden mb-4 rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={"http://localhost:5000" + discussion.image} // Image from API response
            alt={discussion.title}
          />
        </div>
        <div className="px-4">
          <h2 className="text-xl font-semibold mb-4">{discussion.title}</h2>
          <p>{discussion.description}</p>
        </div>
      </div>

      {/* Right Section: Discussion Info and Join/Detail Button */}
      <div className="w-full h-80 md:w-80 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">{discussion.title}</h2>
        <p className="text-gray-600 mb-4">
          Kategori: {discussion.category.name}
        </p>

        {/* Number of participants */}
        <div className="mb-4">
          <h3 className="text-md font-semibold">Jumlah Orang di Diskusi:</h3>
          <p>{discussion.users.length} orang</p>
        </div>

        {/* Conditionally render Join or Detail button */}
        {isUserJoined ? (
          <button
            onClick={handleDetailClick}
            className="btn btn-secondary w-full mt-12"
          >
            Detail
          </button>
        ) : (
          <button
            onClick={handleJoinClick}
            className="btn btn-primary w-full mt-12"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
};

export default DiskusiDetail;
