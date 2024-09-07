import React, { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaRegUser,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdDashboard, MdCategory } from "react-icons/md"; // Import ikon Category
import { AuthContext } from "../contexts/AuthProvider";

const DasboardAdmin = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-center my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboard />
            </label>
          </div>

          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <img src="/public/logo2.png" alt="eduspace" className="w-10" />
                <span className="text-lg font-bold text-primary">
                  Eduspace Admin
                </span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to="/dashboard/TutorAdmin">
                <FaChalkboardTeacher />
                Tutor With Expert
              </Link>
            </li>
            <li className="mt-3">
              <Link to="/dashboard/ExpertAdmin">
                <FaUser />
                Expert
              </Link>
            </li>
            <li className="mt-3">
              <Link to="/dashboard/OpenAdmin">
                <GoCommentDiscussion />
                Open Discuss
              </Link>
            </li>
            <li>
              <Link to="/dashboard/Transaction">
                <LiaFileInvoiceSolid />
                Transaction
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users">
                <FaUsers />
                Users
              </Link>
            </li>
            {/* Tambahkan link untuk Category */}
            <li className="mt-3">
              <Link to="/dashboard/category">
                <MdCategory />
                Category
              </Link>
            </li>
            <button
              className="btn rounded-full px-6 bg-primary flex items-center gap-2 text-white mt-2"
              onClick={handleLogout}
            >
              <FaRegUser />
              Logout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DasboardAdmin;
