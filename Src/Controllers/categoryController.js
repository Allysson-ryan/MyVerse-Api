const categoryService = require("../Services/categoryService");

exports.getCategories = async (req, res) => {
  const data = await categoryService.getCategories(req.user.id);
  res.json(data);
};

exports.createCategory = async (req, res) => {
  try {
    const created = await categoryService.createCategory(req.body, req.user.id);
    res.status(201).json(created);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Erro ao criar a categoria",
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const updatedCategory = await categoryService.updateCategory(
    id,
    req.body,
    req.user.id
  );
  res.json(updatedCategory);
};

exports.deleteCategory = async (req, res) => {
  await categoryService.deleteCategory(req.params.id, req.user.id);
  res.status(204).send();
};
