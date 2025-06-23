const Wishlist = require("../Model/WishlistModel");

exports.getWishlist = (userId) =>
  Wishlist.find({ userId }).populate("category");
exports.createWishlist = (userId, data) => Wishlist.create({ ...data, userId });
exports.updateWishlist = (id, data) =>
  Wishlist.findByIdAndUpdate(id, data, { new: true });
exports.deleteWishlist = (id) => Wishlist.findByIdAndDelete(id);
