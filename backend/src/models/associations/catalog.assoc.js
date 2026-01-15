module.exports = ({ Category, Product, ProductVariant }) => {
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
};
