const Review = require("../Model/ReviewModel");

exports.getAllReviews = (userId) =>
  Review.find({ userId }).populate("category", "name");
exports.getLatestReviews = (userId) =>
  Review.find({
    userId,
    status: { $in: ["Finalizado", "Abandonei"] },
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("category", "name");
exports.getReviewById = (id) => Review.findById(id);
exports.createReview = (userId, data) => Review.create({ ...data, userId });
exports.updateReview = (id, data) =>
  Review.findByIdAndUpdate(id, data, { new: true });
exports.deleteReview = (id) => Review.findByIdAndDelete(id);
