// src/components/VideoGallery.js

import React, { useState } from 'react';

const VideoGallery = ({ videos }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const handleVideoChange = (index) => {
    setSelectedVideoIndex(index);
  };

  return (
    <div className="p-4 bg-gray-100 border-t">
      <h4 className="text-lg font-semibold mb-4">Class Videos</h4>
      
      {/* Video Player */}
      <div className="mb-4">
        <video
          key={selectedVideoIndex} // Force re-render when selectedVideoIndex changes
          controls
          className="w-full"
        >
          <source src={videos[selectedVideoIndex].src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Selection Buttons */}
      <div className="flex space-x-4">
        {videos.map((video, index) => (
          <button
            key={index}
            onClick={() => handleVideoChange(index)}
            className={`px-4 py-2 rounded ${selectedVideoIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Video {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
