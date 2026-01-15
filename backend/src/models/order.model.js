const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    userId: { type: DataTypes.INTEGER, allowNull: true },

    guestFullName: { type: DataTypes.STRING },
    guestEmail: { type: DataTypes.STRING },
    guestPhone: { type: DataTypes.STRING },

    orderCode: { type: DataTypes.STRING(50), allowNull: false, unique: true },

    orderStatus: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "completed",
        "cancelled",
        "reported"
      ),
      defaultValue: "pending",
    },

    subtotal: { type: DataTypes.FLOAT, defaultValue: 0 },
    shippingFee: { type: DataTypes.FLOAT, defaultValue: 0 },
    discount: { type: DataTypes.FLOAT, defaultValue: 0 },
    totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 },

    customerNote: { type: DataTypes.STRING },

    metadata: { type: DataTypes.JSON },
  },
  {
    tableName: "orders",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["order_code"] },
      { fields: ["created_at"] },
    ],
  }
);

module.exports = Order;
