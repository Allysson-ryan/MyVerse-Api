const Category = require("../Model/CategoryModel");

exports.getCategories = (userId) => Category.find({ userId });
exports.createCategory = (data, userId) => Category.create({ ...data, userId });
exports.updateCategory = (id, data, userId) =>
  Category.findOneAndUpdate({ _id: id, userId }, data, { new: true });
exports.deleteCategory = (id, userId) =>
  Category.findOneAndDelete({ _id: id, userId });
