import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterEdu from "../components/FooterEdu";
import "../App.css";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingTransisi from "../components/LoadingTransisi";

const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div>
      <div>
        {loading ? (
          <LoadingTransisi />
        ) : (
          <div>
            <Navbar />
            <div className="min-h-screen">
              <Outlet />
            </div>
            <FooterEdu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
