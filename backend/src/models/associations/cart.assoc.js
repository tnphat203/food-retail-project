module.exports = ({ Cart, CartItem, Product, ProductVariant }) => {
  Cart.hasMany(CartItem, {
    as: "items",
    foreignKey: "cartId",
    onDelete: "CASCADE",
  });

  CartItem.belongsTo(Cart, {
    as: "cart",
    foreignKey: "cartId",
  });

  Product.hasMany(CartItem, {
    as: "cartItems",
    foreignKey: "productId",
  });

  CartItem.belongsTo(Product, {
    as: "product",
    foreignKey: "productId",
  });

  ProductVariant.hasMany(CartItem, {
    as: "cartItems",
    foreignKey: "variantId",
  });

  CartItem.belongsTo(ProductVariant, {
    as: "variant",
    foreignKey: "variantId",
  });
};
