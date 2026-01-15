const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const OrderShippingAddress = sequelize.define(
  "OrderShippingAddress",
  {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,

    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    ward: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
  },
  {
    tableName: "order_shipping_addresses",
    timestamps: false,
    underscored: true,
  }
);

module.exports = OrderShippingAddress;
