const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./User");
const Address = sequelize.define(
  "Address",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    receiverName: { type: DataTypes.STRING(100), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    addressLine: { type: DataTypes.STRING(255), allowNull: false },
    city: { type: DataTypes.STRING(100), allowNull: false },
    district: { type: DataTypes.STRING(100), allowNull: false },
    ward: { type: DataTypes.STRING(100), allowNull: false },
    isDefault: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "addresses",
    timestamps: true,
    underscored: true,
  }
);

User.hasMany(Address, { as: "addresses", foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });

module.exports = Address;
