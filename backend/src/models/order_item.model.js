const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    orderId: { type: DataTypes.INTEGER, allowNull: false },

    productId: { type: DataTypes.INTEGER, allowNull: true },
    variantId: { type: DataTypes.INTEGER, allowNull: true },

    name: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING },

    flavor: { type: DataTypes.STRING },
    weight: { type: DataTypes.STRING },

    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },

    image: { type: DataTypes.STRING },
  },
  {
    tableName: "order_items",
    timestamps: false,
    underscored: true,
  }
);

module.exports = OrderItem;
