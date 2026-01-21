const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },

    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "SEO path: /do-an-vat/khoai-tay-chien",
    },
  },
  {
    tableName: "categories",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["slug"] },
      { fields: ["parent_id"] },
      { fields: ["path"] },
    ],
  },
);

module.exports = Category;
