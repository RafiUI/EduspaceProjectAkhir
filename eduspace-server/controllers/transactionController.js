const User = require("../models/userModel");
const Tutor = require("../models/tutorModel");
const Transaction = require("../models/transactionModel");

const buyTutor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tutorId } = req.body;
    let imagePath = null;

    if (!req.file) {
      return res.status(400).json({ message: "Proof of payment is required" });
    }
    imagePath = req.file.filename;

    const tutor = await Tutor.findById(tutorId);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    const existingTransaction = await Transaction.findOne({
      user: userId,
      tutor: tutorId,
    });
    if (existingTransaction) {
      return res
        .status(400)
        .json({ message: "You have already purchased this tutor" });
    }

    const newTransaction = new Transaction({
      user: userId,
      tutor: tutorId,
      amount: tutor.price,
      proofPayment: imagePath ? `/uploads/${imagePath}` : null,
    });

    await newTransaction.save();
    return res.status(201).json({ message: "Tutor purchased successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPurchasedTutors = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({ user: userId })
      .populate("user")
      .populate({
        path: "tutor",
        populate: [
          {
            path: "expert",
          },
          {
            path: "category",
          },
        ],
      });

    if (!transactions.length) {
      return res.status(404).json({ message: "No tutors purchased yet" });
    }

    return res
      .status(200)
      .json({ message: "Purchased tutors retrieved", data: transactions });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTransactionsByStatus = async (req, res) => {
  try {
    const { status } = req.query; // Get status from query parameters

    let query = {};

    // If a valid status is provided, add it to the query
    if (status && ["pending", "accept", "rejected"].includes(status)) {
      query.status = status;
    }

    // Find transactions based on the query
    const transactions = await Transaction.find(query)
      .populate("user")
      .populate({
        path: "tutor",
        populate: [
          {
            path: "expert",
          },
          {
            path: "category",
          },
        ],
      });

    // Check if any transactions were found

    return res.status(200).json({
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const validatePurchase = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      return res
        .status(400)
        .json({ message: "Transaction ID and status are required" });
    }

    if (!["pending", "accept", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    // Find the transaction by ID and update the status
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({
      message: "Transaction status updated successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating transaction status",
      error: error.message,
    });
  }
};

module.exports = {
  buyTutor,
  getPurchasedTutors,
  getTransactionsByStatus,
  validatePurchase,
};
