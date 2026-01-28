const categoryService = require("../services/category.service");

exports.createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
};

exports.getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

exports.getCategoryBySlug = async (req, res) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};

exports.updateCategory = async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body,
  );

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const deleted = await categoryService.deleteCategory(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json({ message: "Category deleted successfully" });
};

exports.getCategoryTree = async (req, res) => {
  const tree = await categoryService.getCategoryTree();
  res.json(tree);
};
