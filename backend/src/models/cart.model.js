const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },

    guestId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },

    currency: {
      type: DataTypes.STRING(10),
      defaultValue: "VND",
    },
  },
  {
    tableName: "carts",
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ["user_id"] }, { fields: ["guest_id"] }],
  }
);

module.exports = Cart;
