import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    
  };
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn-ghost btn-circle avatar flex justify-center items-center"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {user.profilePicture ? (
                <img
                  alt="Tailwind CSS Navbar component"
                  src={"http://localhost:5000/" + user.profilePicture}
                />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a href="/MyClass">My Class</a>
            </li>
            <li>
              <a href="/MyDiscussion">My Discussion</a>
            </li>
            <li>
              <a onClick={handleLogout}>LogOut</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
