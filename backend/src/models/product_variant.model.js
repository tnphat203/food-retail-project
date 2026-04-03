const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const ProductVariantWeight = require("./product_variant_weight.model");

const ProductVariant = sequelize.define(
  "ProductVariant",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    flavor: { type: DataTypes.STRING(50), allowNull: false },
    flavorCode: { type: DataTypes.STRING(20), allowNull: false },
    status: {
      type: DataTypes.ENUM("in_stock", "out_of_stock", "coming_soon"),
      defaultValue: "in_stock",
    },
    images: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  },
  {
    tableName: "product_variants",
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ["product_id"] }, { fields: ["status"] }],
  },
);

module.exports = ProductVariant;
