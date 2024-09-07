import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  const login = async (user, token) => {
    setUser(user);
    setToken(token);
  };

  // Logout
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        var response = await axiosInstance.get("user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200) {
       
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {}
  };

  // Cek Sign in pengguna
  useEffect(() => {
    fetchUserProfile().then(() => setLoading(false));
  }, []);

  const authInfo = {
    user,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
