import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance"; // Import your axios instance
import axios from "axios"; // Import axios for the manual request

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [token, setToken] = useState(null);
  const [form, setForm] = useState({
    tutor: "",
    title: "",
    kategori: "",
    harga: "",
    jadwal: "",
    user: "",
    bukti: "",
    status: "",
  });
  const [statusFilter, setStatusFilter] = useState(""); // To filter transactions by status
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Transaction to update status

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    setToken(tokenLocal);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [statusFilter, token]); // Re-fetch when the status filter or token changes

  const fetchTransactions = () => {
    axiosInstance
      .get(`admin/transactions`, {
        params: { status: statusFilter },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTransactions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = () => {
    axiosInstance
      .put(`/transactions/${editTransaction._id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedTransaction = response.data;
        setTransactions(
          transactions.map((transaction) =>
            transaction._id === updatedTransaction._id
              ? updatedTransaction
              : transaction
          )
        );
        setEditTransaction(null);
        resetForm();
      })
      .catch((error) => {
        console.error("Error updating transaction:", error);
      });
  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/transactions/${id}`)
      .then(() => {
        setTransactions(
          transactions.filter((transaction) => transaction._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  const handleConfirmClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleConfirm = () => {
    const { _id } = selectedTransaction;
    const { status } = form;

    // Use axios for manual request
    const data = JSON.stringify({
      id: _id,
      status,
    });

    axiosInstance
      .put("admin/transactions", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedTransaction = response.data;
        if (response.status == 200) {
          alert(`Berhasil ${status} transactions`);
        }else{
          alert(`Gagal ${status} transactions`);
        }
        setTransactions(
          transactions.map((transaction) =>
            transaction._id === updatedTransaction._id
              ? updatedTransaction
              : transaction
          )
        );
        setShowModal(false);
        setSelectedTransaction(null);
        resetForm();
      })
      .catch((error) => {
        console.error("Error confirming transaction:", error);
      });
  };

  const resetForm = () => {
    setForm({
      tutor: "",
      title: "",
      kategori: "",
      harga: "",
      jadwal: "",
      user: "",
      bukti: "",
      status: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction List</h2>

      <div className="mb-4">
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="accept">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {editTransaction && (
        <div className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-bold mb-2">Edit Transaction</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <input
              type="text"
              name="tutor"
              value={form.tutor}
              onChange={handleFormChange}
              placeholder="Tutor"
              className="input mb-2 w-full"
              required
            />
            {/* Additional form fields */}
            <select
              name="status"
              value={form.status}
              onChange={handleFormChange}
              className="input mb-2 w-full"
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="accept">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <button type="submit" className="btn btn-primary">
              Update Transaction
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => {
                setEditTransaction(null);
                resetForm();
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full border-b-2 border-gray-200">
            <th className="py-2 px-4 bg-gray-50 text-left">Tutor</th>
            <th className="py-2 px-4 bg-gray-50 text-left">Title</th>
            <th className="py-2 px-4 bg-gray-50 text-left">Kategori</th>
            <th className="py-2 px-4 bg-gray-50 text-left">Harga</th>
            <th className="py-2 px-4 bg-gray-50 text-left">Jadwal</th>
            <th className="py-2 px-4 bg-gray-50 text-left">User</th>
            <th className="py-2 px-4 bg-gray-50 text-left">Proof</th>
            <th className="py-2 px-4 bg-gray-50 text-left">Status</th>{" "}
            {/* Add Status Column */}
            <th className="py-2 px-4 bg-gray-50 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="border-b border-gray-200">
              <td className="py-2 px-4">{transaction.tutor.expert.name}</td>
              <td className="py-2 px-4">{transaction.tutor.title}</td>
              <td className="py-2 px-4">{transaction.tutor.category.name}</td>
              <td className="py-2 px-4">{transaction.amount}</td>
              <td className="py-2 px-4">{transaction.tutor.jadwal}</td>
              <td className="py-2 px-4">
                {transaction.user === null ? "N/A" : transaction.user.name}
              </td>
              <td className="py-2 px-4">
                <img
                  src={"http://localhost:5000" + transaction.proofPayment}
                  alt="Bukti Pembayaran"
                />
              </td>
              <td className="py-2 px-4">{transaction.status}</td>{" "}
              {/* Show Status */}
              <td className="py-2 px-4">
                <button
                  className="btn btn-success mr-2"
                  onClick={() => handleConfirmClick(transaction)}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => {
                    setEditTransaction(transaction);
                    setForm({
                      tutor: transaction.tutor._id,
                      title: transaction.tutor.title,
                      kategori: transaction.tutor.category._id,
                      harga: transaction.amount,
                      jadwal: transaction.tutor.jadwal,
                      user: transaction.user,
                      bukti: transaction.proofPayment,
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(transaction._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Confirm Status */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Confirm Status</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirm();
              }}
            >
              <select
                name="status"
                value={form.status}
                onChange={handleFormChange}
                className="input mb-2 w-full"
                required
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="accept">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
