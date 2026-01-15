module.exports = ({
  User,
  Order,
  OrderItem,
  OrderShippingAddress,
  OrderPayment,
  OrderVoucher,
  Product,
  ProductVariant,
  Voucher,
}) => {
  User.hasMany(Order, {
    as: "orders",
    foreignKey: "userId",
    onDelete: "RESTRICT",
  });

  Order.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });

  Order.hasMany(OrderItem, {
    as: "items",
    foreignKey: "orderId",
    onDelete: "RESTRICT",
  });

  OrderItem.belongsTo(Order, {
    as: "order",
    foreignKey: "orderId",
  });

  Product.hasMany(OrderItem, {
    as: "orderItems",
    foreignKey: "productId",
  });

  OrderItem.belongsTo(Product, {
    as: "product",
    foreignKey: "productId",
  });

  ProductVariant.hasMany(OrderItem, {
    as: "orderItems",
    foreignKey: "variantId",
  });

  OrderItem.belongsTo(ProductVariant, {
    as: "variant",
    foreignKey: "variantId",
  });

  Order.hasOne(OrderShippingAddress, {
    as: "shippingAddress",
    foreignKey: "orderId",
    onDelete: "CASCADE",
  });

  OrderShippingAddress.belongsTo(Order, {
    as: "order",
    foreignKey: "orderId",
  });

  Order.hasOne(OrderPayment, {
    as: "payment",
    foreignKey: "orderId",
    onDelete: "CASCADE",
  });

  OrderPayment.belongsTo(Order, {
    as: "order",
    foreignKey: "orderId",
  });

  Order.hasOne(OrderVoucher, {
    as: "voucher",
    foreignKey: "orderId",
    onDelete: "CASCADE",
  });

  OrderVoucher.belongsTo(Order, {
    as: "order",
    foreignKey: "orderId",
  });

  if (Voucher) {
    Voucher.hasMany(OrderVoucher, {
      as: "orderVouchers",
      foreignKey: "voucherId",
    });

    OrderVoucher.belongsTo(Voucher, {
      as: "voucherDetail",
      foreignKey: "voucherId",
    });
  }
};
