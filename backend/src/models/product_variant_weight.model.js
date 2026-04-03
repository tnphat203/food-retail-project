const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ProductVariantWeight = sequelize.define(
  "ProductVariantWeight",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    variantId: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    discountPrice: { type: DataTypes.FLOAT, defaultValue: 0 },
    discountType: { type: DataTypes.ENUM("percent", "fixed"), allowNull: true },
    discountPercent: { type: DataTypes.FLOAT, defaultValue: 0 },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    tableName: "product_variant_weights",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeSave: (weight) => {
        if (weight.price != null && weight.discountPrice != null) {
          if (weight.discountType === "percent") {
            weight.discountPrice =
              Number(weight.price) * (1 - Number(weight.discountPrice) / 100);
            weight.discountPercent =
              Number(weight.price) > 0
                ? ((Number(weight.price) - Number(weight.discountPrice)) /
                    Number(weight.price)) *
                  100
                : 0;
          } else if (weight.discountType === "fixed") {
            weight.discountPercent =
              Number(weight.price) > 0
                ? ((Number(weight.price) - Number(weight.discountPrice)) /
                    Number(weight.price)) *
                  100
                : 0;
          } else {
            weight.discountPrice = Number(weight.price);
            weight.discountPercent = 0;
          }
        } else {
          weight.discountPrice = 0;
          weight.discountPercent = 0;
        }
      },
    },
  },
);

module.exports = ProductVariantWeight;
