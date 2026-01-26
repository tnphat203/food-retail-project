const userService = require("../services/user.service");

/**
 * GET /api/users/me
 * Lấy thông tin user hiện tại
 */
exports.getMe = async (req, res) => {
  const user = await userService.getById(req.user.id);

  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    status: user.status,
  });
};

/**
 * PUT /api/users/me
 * Update profile của chính mình
 */
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

/**
 * GET /api/users
 * Admin – lấy danh sách user
 */
exports.getAllUsers = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};

/**
 * GET /api/users/:id
 * Admin – lấy user theo id
 */
exports.getUserById = async (req, res) => {
  const user = await userService.getById(req.params.id);
  res.json(user);
};

/**
 * PUT /api/users/:id
 * Admin – update user
 */
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

/**
 * PATCH /api/users/:id/status
 * Admin – activate / deactivate user
 */
exports.changeStatus = async (req, res) => {
  const { status } = req.body;

  const user = await userService.update(req.params.id, { status });

  res.json({
    message: "User status updated",
    user,
  });
};
