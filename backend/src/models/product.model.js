const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    name: { type: DataTypes.STRING(150), allowNull: false },
    slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },

    shortDescription: { type: DataTypes.STRING(500), allowNull: true },
    brand: { type: DataTypes.STRING(100), allowNull: true },
    tags: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },

    ratingAverage: { type: DataTypes.FLOAT, defaultValue: 0 },
    ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 },

    categoryId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "products",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["slug"] },
      { fields: ["status"] },
      { fields: ["category_id"] },
    ],
  }
);

module.exports = Product;
