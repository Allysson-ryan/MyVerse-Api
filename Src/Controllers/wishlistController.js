const wishlistService = require("../Services/wishlistService");

exports.getWishlist = async (req, res) => {
  const data = await wishlistService.getWishlist(req.user.id);
  res.json(data);
};

exports.createWishlist = async (req, res) => {
  const created = await wishlistService.createWishlist(req.user.id, req.body);
  res.status(201).json(created);
};

exports.updateWishlist = async (req, res) => {
  const updated = await wishlistService.updateWishlist(req.params.id, req.body);
  res.json(updated);
};

exports.deleteWishlist = async (req, res) => {
  await wishlistService.deleteWishlist(req.params.id);
  res.status(204).send();
};
