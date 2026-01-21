const Category = require("../models/category.model");
const { Op } = require("sequelize");

/**
 * Tạo category
 */
exports.createCategory = async ({ name, slug, parent_id }) => {
  // Kiểm tra slug trùng
  const existed = await Category.findOne({ where: { slug } });
  if (existed) {
    throw new Error("Slug already exists");
  }

  // Build path
  let path = `/${slug}`;

  if (parent_id) {
    const parent = await Category.findByPk(parent_id);
    if (!parent) {
      throw new Error("Parent category not found");
    }
    path = `${parent.path}/${slug}`;
  }

  return Category.create({
    name,
    slug,
    parent_id,
    path,
  });
};

/**
 * Lấy danh sách category (phẳng)
 */
exports.getAllCategories = async () => {
  return Category.findAll({
    order: [["created_at", "ASC"]],
  });
};

/**
 * Lấy category theo slug
 */
exports.getCategoryBySlug = async (slug) => {
  return Category.findOne({ where: { slug } });
};

/**
 * Cập nhật category
 */
exports.updateCategory = async (id, payload) => {
  const category = await Category.findByPk(id);
  if (!category) return null;

  await category.update(payload);
  return category;
};

/**
 * Xoá category
 */
exports.deleteCategory = async (id) => {
  return Category.destroy({ where: { id } });
};

/**
 * Lấy category dạng cây (menu, sidebar)
 */
exports.getCategoryTree = async () => {
  const categories = await Category.findAll({
    raw: true,
    order: [["id", "ASC"]],
  });

  const map = {};
  const tree = [];

  for (const c of categories) {
    map[c.id] = { ...c, children: [] };
  }

  for (const c of categories) {
    if (c.parent_id) {
      map[c.parent_id]?.children.push(map[c.id]);
    } else {
      tree.push(map[c.id]);
    }
  }

  return tree;
};
