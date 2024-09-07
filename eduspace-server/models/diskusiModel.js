const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referensi ke model User
      required: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Tidak perlu _id untuk subdocument message
);

const discussionSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Assume a separate Category model
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referensi ke model User
      },
    ],
    messages: [messageSchema], // Array untuk menyimpan pesan dalam diskusi
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
