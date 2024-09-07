import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axiosInstance from "../axiosInstance";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect setup
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Handle form submission
  const onSubmit = (data) => {
    const { email, password, name } = data; // Destructure name from form data

    axiosInstance
      .post("auth/register", JSON.stringify(data))
      .then((res) => {
        if (res.status == 201) {
          alert(res.data.message);
          navigate("/" , {replace : true})
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  // Handle Google sign-in (example)
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        alert("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex justify-center mt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className="text-lg font-bold">Create Account</h3>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>

          {/* Email*/}
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
            {errors.email && <p className="text-red-500">Email is required</p>}
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
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-xs italic">{errorMessage}</p>
          )}

          {/* Sign Up Button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-primary text-white"
            />
          </div>
          <p className="text-center my-2">
            Sudah punya akun?{" "}
            <button
              className="underline font-bold text-primary ml-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login Sekarang
            </button>
          </p>

          {/* Social Login Button */}
          <div className="text-center space-x-3 mb-5">
            <button
              className="btn btn-circle hover:btn-primary hover:text-white"
              onClick={handleLogin}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:btn-primary hover:text-white">
              <FaFacebookF />
            </button>
          </div>

          {/* Close Button */}
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
      </div>
      <div>
        <Modal />
      </div>
    </div>
  );
};

export default Register;
