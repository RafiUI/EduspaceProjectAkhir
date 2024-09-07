import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance"; // Ensure you have axiosInstance configured

const UpdateProfile = () => {
  const { logOut } = useContext(AuthContext); // Auth context
  const [userData, setUserData] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // On mount, get user data from localStorage and pre-fill the form
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Assume user is stored in localStorage
    if (storedUser) {
      setUserData(storedUser);
      setValue("name", storedUser.name);
      setValue("email", storedUser.email);
      // No need to setValue for photoURL as it's a file input
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      // Only append the file if it's provided
      if (data.photoURL && data.photoURL.length > 0) {
        formData.append("image", data.photoURL[0]); // `photoURL` is a FileList, get the first file
      }

      // Send request to update profile
      const response = await axiosInstance.post("user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is available
        },
      });

      if (response.data.message === "Profile updated successfully") {
        alert("Profile berhasil diperbarui silahkan login ulang!");
        // Update local storage or context with new data if needed
        logOut();
        navigate(from, { replace: true });
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-3xl font-bold text-center">Edit Profile</h3>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="name"
              className="input input-bordered"
              defaultValue={userData.name || ""}
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>

          {/* Email (disabled, cannot be changed) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="email"
              className="input input-bordered"
              defaultValue={userData.email || ""}
              disabled
            />
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Image</span>
            </label>
            <input
              {...register("photoURL")}
              type="file"
              className="input input-bordered"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
