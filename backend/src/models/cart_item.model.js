const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    cartId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    variantId: { type: DataTypes.INTEGER, allowNull: false },

    flavor: { type: DataTypes.STRING(50), allowNull: true },
    flavorCode: { type: DataTypes.STRING(20), allowNull: true },
    weight: { type: DataTypes.STRING(50), allowNull: false },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: { min: 1 },
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    discountPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: { min: 0 },
    },
    finalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },

    key: { type: DataTypes.STRING(100), allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "cart_items",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["cart_id"] },
      { fields: ["product_id"] },
      { fields: ["variant_id"] },
    ],
    hooks: {
      beforeValidate: (item) => {
        item.finalPrice =
          item.discountPrice != null ? item.discountPrice : item.price;
      },
    },
  }
);

module.exports = CartItem;
