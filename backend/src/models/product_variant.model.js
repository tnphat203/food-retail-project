const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ProductVariant = sequelize.define(
  "ProductVariant",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    productId: { type: DataTypes.INTEGER, allowNull: false },

    flavor: { type: DataTypes.STRING(50), allowNull: false },
    flavorCode: { type: DataTypes.STRING(20), allowNull: false },

    weightVariants: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

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
    hooks: {
      beforeSave: (variant) => {
        if (variant.changed("weightVariants")) {
          const variants = variant.weightVariants || [];
          const totalStock = variants.reduce(
            (sum, w) => sum + (Number(w.stock) || 0),
            0
          );

          if (totalStock > 0 && variant.status !== "coming_soon")
            variant.status = "in_stock";
          else if (totalStock <= 0) variant.status = "out_of_stock";
        }
      },
    },
  }
);

module.exports = ProductVariant;
