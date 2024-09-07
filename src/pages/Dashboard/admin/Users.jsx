import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit', 'delete', 'add'

  useEffect(() => {
    const tokenTemp = localStorage.getItem("token");
    setToken(tokenTemp);

    const getUsers = async () => {
      try {
        if (tokenTemp) {
          const response = await axiosInstance.get("admin/user", {
            headers: {
              Authorization: `Bearer ${tokenTemp}`,
            },
          });
          setUsers(response.data); // Adjust based on API response
          console.log(response.data); // Log the response data
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getUsers();
  }, [token]);

  const handleAdd = () => {
    setSelectedUser({ email: "", role: "" });
    setModalType("add");
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalType("edit");
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setModalType("delete");
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const handleSave = async () => {
    try {
      if (modalType === "edit" && selectedUser && token) {
        await axiosInstance.put(
          `admin/user/${selectedUser._id}`,
          selectedUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        closeModal();
      } else if (modalType === "add" && selectedUser && token) {
        await axiosInstance.post(`admin/user`, selectedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        closeModal();
      }
      // Refresh user list after add/edit
      const response = await axiosInstance.get("admin/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedUser && token) {
        await axiosInstance.delete(`admin/user/${selectedUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        closeModal();
        // Refresh user list after deletion
        const response = await axiosInstance.get("admin/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>

      {/* Button to add a new user */}
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add User
      </button>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full border-b-2 border-gray-200">
            <th className="py-2 px-4 bg-gray-50 text-left">ID</th>
            <th className="py-2 px-4 bg-gray-50 text-left">Email/Username</th>
            <th className="py-2 px-4 bg-gray-50 text-left">Role</th>
            <th className="py-2 px-4 bg-gray-50 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{user._id}</td>
                <td className="py-2 px-4">{user.email || user.username}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modalType === "edit" || modalType === "add" ? (
        <>
          <h3 className="text-xl font-bold mb-4">
            {modalType === "edit" ? "Edit User" : "Add User"}
          </h3>
          <input
            type="text"
            value={selectedUser.email || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
            placeholder="Email"
            className="border border-gray-300 p-2 mb-2 w-full"
          />
          <input
            type="password"
            value={selectedUser.password || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, password: e.target.value })
            }
            placeholder="Password"
            className="border border-gray-300 p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={selectedUser.name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
            placeholder="Name"
            className="border border-gray-300 p-2 mb-2 w-full"
          />
          <select
            value={selectedUser.role || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
            }
            className="border border-gray-300 p-2 mb-2 w-full"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </>
      ) : modalType === "delete" ? (
        <>
          <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
          <p>Are you sure you want to delete this user?</p>
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Users;
