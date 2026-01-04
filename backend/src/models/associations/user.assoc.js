module.exports = ({ User, Address, Cart }) => {
  User.hasMany(Address, {
    as: "addresses",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  Address.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });

  User.hasOne(Cart, {
    as: "cart",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  Cart.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });
};
