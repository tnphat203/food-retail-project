const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING(50), allowNull: false },
    lastName: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    gender: { type: DataTypes.STRING(10), allowNull: true },
    dateOfBirth: { type: DataTypes.DATEONLY, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    role: {
      type: DataTypes.ENUM("customer", "staff", "admin"),
      defaultValue: "customer",
    },
    status: { type: DataTypes.STRING(20), defaultValue: "active" },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;
