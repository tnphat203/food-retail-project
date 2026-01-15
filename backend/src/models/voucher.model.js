const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Voucher = sequelize.define(
  "Voucher",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    type: {
      type: DataTypes.ENUM("percent", "fixed"),
      allowNull: false,
    },

    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },

    maxDiscount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    endAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    usageLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    usedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    perUserLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    minOrderValue: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    combinable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "vouchers",
    timestamps: true,
    underscored: true,

    indexes: [
      { fields: ["code"] },
      { fields: ["active"] },
      { fields: ["start_at", "end_at"] },
    ],
  }
);

module.exports = Voucher;
