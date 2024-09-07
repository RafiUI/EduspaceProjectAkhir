const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "accept", "rejected"],
      default: "pending",
    },
    proofPayment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Transaction model
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
