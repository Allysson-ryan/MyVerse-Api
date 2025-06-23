const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  imageUrl: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  status: String,
  totalEp: { type: Number },
  totalPag: { type: Number },
  consumed: { type: Number, default: 0 },
  startDate: Date,
  endDate: Date,
  rating: Number,
  favorite: Boolean,
  synopsis: String,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
