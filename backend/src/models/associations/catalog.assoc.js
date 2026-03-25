module.exports = ({
  Category,
  Product,
  ProductVariant,
  ProductVariantWeight,
}) => {
  Category.hasMany(Product, {
    as: "products",
    foreignKey: "categoryId",
    onDelete: "RESTRICT",
  });
  Product.belongsTo(Category, {
    as: "category",
    foreignKey: "categoryId",
  });

  Product.hasMany(ProductVariant, {
    as: "variants",
    foreignKey: "productId",
    onDelete: "CASCADE",
  });
  ProductVariant.belongsTo(Product, {
    as: "product",
    foreignKey: "productId",
  });

  ProductVariant.hasMany(ProductVariantWeight, {
    as: "weights",
    foreignKey: "variantId",
    onDelete: "CASCADE",
  });
  ProductVariantWeight.belongsTo(ProductVariant, {
    as: "variant",
    foreignKey: "variantId",
  });
};
