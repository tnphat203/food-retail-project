const { Op } = require("sequelize");
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ProductVariant = require("../models/product_variant.model");
const ProductVariantWeight = require("../models/product_variant_weight.model");

exports.createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.getById = async (id) => {
  return await Product.findByPk(id, {
    include: [
      {
        model: ProductVariant,
        as: "variants",
        include: [
          {
            model: ProductVariantWeight,
            as: "weights",
          },
        ],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    ],
  });
};

exports.getAllPaginated = async ({
  page = 1,
  limit = 10,
  search,
  categoryId,
  status,
  sortBy = "updatedAt",
  order = "DESC",
}) => {
  const where = {};

  if (categoryId && categoryId !== "all") {
    where.categoryId = categoryId;
  }

  if (status && status !== "all") {
    where.status = status;
  }

  if (search) {
    const keyword = `%${search}%`;
    where[Op.or] = [
      { name: { [Op.like]: keyword } },
      { brand: { [Op.like]: keyword } },
      { slug: { [Op.like]: keyword } },
      { tags: { [Op.like]: keyword } },
    ];
  }

  const offset = (page - 1) * limit;

  const allowedSortFields = ["updatedAt", "ratingAverage", "ratingCount"];
  const finalSortBy = allowedSortFields.includes(sortBy) ? sortBy : "updatedAt";
  const finalOrder = String(order).toUpperCase() === "ASC" ? "ASC" : "DESC";

  let orderClause = [[finalSortBy, finalOrder]];

  if (finalSortBy === "ratingAverage") {
    orderClause = [
      ["ratingAverage", "DESC"],
      ["ratingCount", "DESC"],
    ];
  }

  const { rows, count } = await Product.findAndCountAll({
    where,
    limit,
    offset,
    order: orderClause,
    distinct: true,
    include: [
      {
        model: Category,
        as: "category",
        required: false,
        ...(search && { where: { name: { [Op.like]: `%${search}%` } } }),
      },
      {
        model: ProductVariant,
        as: "variants",
        required: false,
        include: [
          {
            model: ProductVariantWeight,
            as: "weights",
            required: false,
          },
        ],
        ...(search && { where: { flavor: { [Op.like]: `%${search}%` } } }),
      },
    ],
  });

  return {
    data: rows,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};

exports.updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.update(data);
  return product;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
};

exports.createVariant = async (productId, data) => {
  const product = await Product.findByPk(productId);
  if (!product) return null;
  const variant = await ProductVariant.create({
    ...data,
    productId,
  });
  return variant;
};

exports.getVariantsByProduct = async (productId) => {
  return await ProductVariant.findAll({
    where: { productId },
    include: [
      {
        model: ProductVariantWeight,
        as: "weights",
      },
    ],
  });
};

exports.createVariantWeight = async (variantId, data) => {
  const variant = await ProductVariant.findByPk(variantId);
  if (!variant) return null;
  const weight = await ProductVariantWeight.create({
    ...data,
    variantId,
  });
  return weight;
};

exports.getVariantWeights = async (variantId) => {
  return await ProductVariantWeight.findAll({
    where: { variantId },
  });
};
