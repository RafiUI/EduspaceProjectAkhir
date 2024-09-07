import React, { useState, useEffect, useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import { useLocation } from "react-router-dom"; // Import useLocation
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation(); // Get the current location

  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setSticky(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to determine if the nav item is active
  const isActive = (path) => location.pathname === path;

  const navItems = (
    <>
      <li>
        <a
          href="/"
          className={`${
            isActive("/") ? "text-primary font-bold underline" : ""
          }`}
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/TutorWithExpert"
          className={`${
            isActive("/TutorWithExpert") ? "text-primary font-bold underline" : ""
          }`}
        >
          Tutor With Expert
        </a>
      </li>
      <li>
        <a
          href="/OpenDiscuss"
          className={`${
            isActive("/OpenDiscuss") ? "text-primary font-bold underline" : ""
          }`}
        >
          Open Discuss
        </a>
      </li>
    </>
  );

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isSticky ? "shadow-lg bg-white" : ""
      }`}
    >
      <div className="navbar xl:px-24 container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">
            <img
              src="/public/eduspacelogo.png"
              alt="EduSpace Logo"
              style={{ width: "100px", height: "auto" }}
            />
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <Profile user={user} /> // If user is logged in, show profile
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-purple text-white flex items-center gap-2"
            >
              <FaRegUser /> Login
            </button>
          )}

          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
