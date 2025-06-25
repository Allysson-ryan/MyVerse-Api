const Category = require("../Model/CategoryModel");

exports.getCategories = (userId) => Category.find({ userId });
exports.createCategory = async (data, userId) => {
  const existing = await Category.findOne({ name: data.name, userId });

  if (existing) {
    const error = new Error("Você já possui uma categoria com esse nome.");
    error.status = 400;
    throw error;
  }

  return Category.create({ ...data, userId });
};

exports.updateCategory = (id, data, userId) =>
  Category.findOneAndUpdate({ _id: id, userId }, data, { new: true });
exports.deleteCategory = (id, userId) =>
  Category.findOneAndDelete({ _id: id, userId });
