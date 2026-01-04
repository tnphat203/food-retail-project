const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const OrderPayment = sequelize.define(
  "OrderPayment",
  {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    type: {
      type: DataTypes.ENUM("COD", "PayOS"),
      defaultValue: "COD",
    },

    status: {
      type: DataTypes.ENUM("pending", "paid", "failed", "cancelled"),
      defaultValue: "pending",
    },

    transactionId: DataTypes.STRING,
    invoiceUrl: DataTypes.STRING,
    note: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
  },
  {
    tableName: "order_payments",
    timestamps: false,
    underscored: true,
    indexes: [{ fields: ["transaction_id"] }],
  }
);

module.exports = OrderPayment;
