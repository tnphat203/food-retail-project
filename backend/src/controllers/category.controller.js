const categoryService = require("../services/category.service");

/**
 * POST /api/categories
 */
exports.createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
};

/**
 * GET /api/categories
 */
exports.getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

/**
 * GET /api/categories/slug/:slug
 */
exports.getCategoryBySlug = async (req, res) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};

/**
 * PUT /api/categories/:id
 */
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

/**
 * DELETE /api/categories/:id
 */
exports.deleteCategory = async (req, res) => {
  const deleted = await categoryService.deleteCategory(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json({ message: "Category deleted successfully" });
};

/**
 * GET /api/categories/tree
 */
exports.getCategoryTree = async (req, res) => {
  const tree = await categoryService.getCategoryTree();
  res.json(tree);
};
