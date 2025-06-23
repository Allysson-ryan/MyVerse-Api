const reviewService = require("../Services/reviewService");

exports.getAllReviews = async (req, res) => {
  const data = await reviewService.getAllReviews(req.user.id);
  res.json(data);
};

exports.getLatestReviews = async (req, res) => {
  const data = await reviewService.getLatestReviews(req.user.id);
  res.json(data);
};

exports.getReviewById = async (req, res) => {
  const review = await reviewService.getReviewById(req.params.id);
  res.json(review);
};

exports.createReview = async (req, res) => {
  const created = await reviewService.createReview(req.user.id, req.body);
  res.status(201).json(created);
};

exports.updateReview = async (req, res) => {
  const updated = await reviewService.updateReview(req.params.id, req.body);
  res.json(updated);
};

exports.deleteReview = async (req, res) => {
  await reviewService.deleteReview(req.params.id);
  res.status(204).send();
};
