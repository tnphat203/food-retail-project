const Address = require("../models/address.model");
const sequelize = require("../config/sequelize");

exports.getMyAddresses = (userId) => {
  return Address.findAll({ where: { userId } });
};

exports.getAllAddresses = () => {
  return Address.findAll();
};

exports.createAddress = (userId, data) => {
  return Address.create({ ...data, userId });
};

exports.updateMyAddress = async (userId, addressId, data) => {
  const address = await Address.findOne({
    where: { id: addressId, userId },
  });

  if (!address) return null;

  return address.update(data);
};

exports.adminUpdateAddress = async (addressId, data) => {
  const address = await Address.findByPk(addressId);
  if (!address) return null;
  return address.update(data);
};

exports.deleteMyAddress = async (userId, addressId) => {
  const address = await Address.findOne({
    where: { id: addressId, userId },
  });

  if (!address) return null;

  await address.destroy();
  return true;
};

exports.setDefaultAddress = async (userId, addressId) => {
  return sequelize.transaction(async (t) => {
    await Address.update(
      { isDefault: false },
      { where: { userId }, transaction: t },
    );

    const result = await Address.update(
      { isDefault: true },
      { where: { id: addressId, userId }, transaction: t },
    );

    if (result[0] === 0) return null;

    return true;
  });
};
