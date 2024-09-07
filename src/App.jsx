import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuatDiskusi from "./BuatDiskusi";
import MyDiscussion from "./MyDiscussion";
import DiskusiDetail from "./DiskusiDetail";

const App = () => {
  const [discussions, setDiscussions] = useState([]);

  const handleAddDiscussion = (newDiscussion) => {
    setDiscussions([...discussions, newDiscussion]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/BuatDiskusi"
          element={<BuatDiskusi onAddDiscussion={handleAddDiscussion} />}
        />
        <Route
          path="/MyDiscussion"
          element={<MyDiscussion discussions={discussions} />}
        />
        <Route path="/diskusi/:title" element={<DiskusiDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
