const Category = require("../models/category.model");
const { Op } = require("sequelize");

exports.createCategory = async ({ name, slug, parent_id }) => {
  const existed = await Category.findOne({ where: { slug } });
  if (existed) {
    throw new Error("Slug already exists");
  }

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

exports.getAllCategories = async () => {
  return Category.findAll({
    order: [["created_at", "ASC"]],
  });
};

exports.getCategoryBySlug = async (slug) => {
  return Category.findOne({ where: { slug } });
};

exports.updateCategory = async (id, payload) => {
  const category = await Category.findByPk(id);
  if (!category) return null;

  await category.update(payload);
  return category;
};

exports.deleteCategory = async (id) => {
  return Category.destroy({ where: { id } });
};

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
