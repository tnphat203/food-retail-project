const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const OrderVoucher = sequelize.define(
  "OrderVoucher",
  {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },

    voucherId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("percent", "fixed"),
      allowNull: false,
    },

    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    discountAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },

    totalBeforeVoucher: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    totalAfterVoucher: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    redeemed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    redeemedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    appliedItems: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    tableName: "order_vouchers",
    timestamps: false,
    underscored: true,
  }
);

module.exports = OrderVoucher;
