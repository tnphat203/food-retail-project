const sequelize = require("../config/sequelize");

// Import all models
const User = require("./user.model");
const Address = require("./address.model");

// ------------------------
// Define associations
// ------------------------

// User <-> Address
User.hasMany(Address, { as: "addresses", foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });

// Export
module.exports = {
  sequelize,
  User,
  Address,
};
