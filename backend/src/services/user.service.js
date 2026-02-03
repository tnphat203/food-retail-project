const { Op } = require("sequelize");
const User = require("../models/user.model");

exports.getById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};

exports.update = async (id, data) => {
  const user = await User.findByPk(id);

  if (!user) return null;

  await user.update(data);

  const result = user.toJSON();
  delete result.password;

  return result;
};

exports.getAllPaginated = async ({ page, limit, search, role, status }) => {
  const where = {};

  if (role) where.role = role;

  if (status) where.status = status;

  if (search) {
    where[Op.or] = [
      { firstName: { [Op.like]: `%${search}%` } },
      { lastName: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ];
  }

  const offset = (page - 1) * limit;

  const { rows, count } = await User.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["password"] },
  });

  return {
    data: rows,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};
