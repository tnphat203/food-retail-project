const userService = require("../services/user.service");

exports.getMe = async (req, res) => {
  const user = await userService.getById(req.user.id);

  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    status: user.status,
  });
};

exports.updateMe = async (req, res) => {
  const { firstName, lastName } = req.body;

  const user = await userService.update(req.user.id, {
    firstName,
    lastName,
  });

  res.json({
    message: "Profile updated",
    user,
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await userService.getById(req.params.id);
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const { role, status } = req.body;

  const user = await userService.update(req.params.id, {
    role,
    status,
  });

  res.json({
    message: "User updated",
    user,
  });
};

exports.changeStatus = async (req, res) => {
  const { status } = req.body;

  const user = await userService.update(req.params.id, { status });

  res.json({
    message: "User status updated",
    user,
  });
};
