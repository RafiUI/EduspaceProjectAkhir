import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance"; // Assuming axiosInstance is configured
import { useLocation, useParams } from "react-router-dom";

const HalamanDiskusi = () => {
  const location = useLocation();
  const { discussionId } = useParams();

  const [discussion, setDiscussion] = useState({
    title: "Diskusi",
    participants: [],
    messages: [],
  });
  const [inputMessage, setInputMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch discussion details from the API
    const fetchDiscussionDetails = async () => {
      try {
        const response = await axiosInstance.get(`/discussion/${discussionId}`);
        const data = response.data.data;

        // Update state with the fetched data

        setDiscussion({
          title: data.title,
          participants: data.users, // Use 'users' for participants
          messages: data.messages || [], // Use 'messages' for discussion messages
        });
      } catch (error) {
        console.error("Failed to fetch discussion details:", error);
      }
    };

    fetchDiscussionDetails();
  }, [discussionId]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" && !selectedImage) return;

    try {
      const formData = new FormData();
      formData.append("content", inputMessage);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const token = localStorage.getItem("token");

      const response = await axiosInstance.post(
        `discussion/${discussionId}/sendMessage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set correct headers for form data
            Authorization: `Bearer ${token}`, // Include authentication token
          },
        }
      );

      // Assuming the API response contains the new message data
      const newMessage = response.data.data; // Adjust to 'data' if the API wraps response in 'data'

      // Update the messages state with the new message from the server
      setDiscussion((prevDiscussion) => ({
        ...prevDiscussion,
        messages: [...prevDiscussion.messages, newMessage],
      }));

      // Clear input and selected image after sending
      setInputMessage("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  console.log(discussion);

  return (
    <div className="section-container py-24 flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-4">{discussion.title}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg">
          <div className="h-96 overflow-y-scroll p-4 bg-white rounded-lg mb-4">
            {discussion.messages.map((message, index) => (
              <div key={index} className="mb-2">
                <strong>{message.sender.name || "User"}:</strong>{" "}
                {message.content}
                {message.image && (
                  <div className="mt-2">
                    <img
                      src={"http://localhost:5000" + message.image}
                      alt="Disematkan"
                      className="max-w-xs rounded-md"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-lg"
              placeholder="Ketik pesan..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <label className="cursor-pointer p-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="Purple"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586a2 2 0 00-2.828-2.828z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 17H7a2 2 0 01-2-2V7a2 2 0 012-2h3"
                />
              </svg>
            </label>

            <button
              className="bg-blue-500 text-primary px-4 rounded-r-lg"
              onClick={handleSendMessage}
            >
              Kirim
            </button>
          </div>
        </div>

        <div className="w-full md:w-80 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Anggota Diskusi</h2>
          <div className="space-y-4">
            {discussion.participants.map((participant, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={
                    "http://localhost:5000/" + participant.profilePicture ||
                    "/profile.png"
                  }
                  alt={participant.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <p>{participant.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalamanDiskusi;
