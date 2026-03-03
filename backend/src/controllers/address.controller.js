const addressService = require("../services/address.service");

exports.getMyAddresses = async (req, res) => {
  const addresses = await addressService.getMyAddresses(req.user.id);
  res.json(addresses);
};

exports.createAddress = async (req, res) => {
  const address = await addressService.createAddress(req.user.id, req.body);
  res.status(201).json(address);
};

exports.updateMyAddress = async (req, res) => {
  const address = await addressService.updateMyAddress(
    req.user.id,
    req.params.id,
    req.body,
  );

  if (!address) return res.status(404).json({ message: "Address not found" });

  res.json(address);
};

exports.deleteMyAddress = async (req, res) => {
  const success = await addressService.deleteMyAddress(
    req.user.id,
    req.params.id,
  );

  if (!success) return res.status(404).json({ message: "Address not found" });

  res.json({ message: "Address deleted" });
};

exports.setDefaultAddress = async (req, res) => {
  const success = await addressService.setDefaultAddress(
    req.user.id,
    req.params.id,
  );

  if (!success) return res.status(404).json({ message: "Address not found" });

  res.json({ message: "Default address updated" });
};

exports.getAllAddresses = async (req, res) => {
  const addresses = await addressService.getAllAddresses();
  res.json(addresses);
};

exports.adminUpdateAddress = async (req, res) => {
  const address = await addressService.adminUpdateAddress(
    req.params.id,
    req.body,
  );

  if (!address) return res.status(404).json({ message: "Address not found" });

  res.json(address);
};
