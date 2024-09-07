// src/components/Modal.js
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axiosInstance from "../axiosInstance"; // Import the Axios instance

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useContext(AuthContext); // Get login method from context
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect setup
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      // Send login request to the backend API using Axios
      const response = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        // If login successful, save token and user data to AuthContext and localStorage
        login(user, token); // Pass token and user to context
        localStorage.setItem("token", token); // Store token
        localStorage.setItem("user", JSON.stringify(user)); // Store user data

        alert(`Welcome ${user.name}!`);

        if (user.role == "admin") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate(from, { replace: true });
        }

        document.getElementById("my_modal_5").close();
      } else {
        setErrorMessage("Login failed. Try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Failed to connect to the server.");
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="text-lg font-bold">Login</h3>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500">Password is required</p>
              )}
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-xs italic">{errorMessage}</p>
            )}
            {/* Login Button */}
            <div className="form-control mt-4">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary text-white"
              />
            </div>
            <p className="text-center my-2">
              Belum punya akun?{" "}
              <Link
                to="/Register"
                className="underline font-bold text-primary ml-1"
              >
                Daftar sekarang
              </Link>
            </p>
          </form>

          {/* Close Button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_5").close()}
          >
            ✕
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
