const userService = require("../services/user.service");
const cloudinary = require("../config/cloudinary");

exports.getMe = async (req, res) => {
  try {
    const user = await userService.getById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const user = await userService.update(req.user.id, { firstName, lastName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "Profile updated",
      user,
    });
  } catch (err) {
    console.error("updateMe error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "10", 10), 1),
      100,
    );

    const search = (req.query.search || "").trim();
    const role = (req.query.role || "").trim();
    const status = (req.query.status || "").trim();

    const result = await userService.getAllPaginated({
      page,
      limit,
      search,
      role,
      status,
    });

    return res.json(result);
  } catch (err) {
    console.error("getAllUsers error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("getUserById error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { status, firstName, lastName, gender, phone, dateOfBirth, email } =
      req.body;

    if (req.body.role !== undefined) {
      return res.status(403).json({
        message: "You are not allowed to update role",
      });
    }

    const currentUser = await userService.getById(req.params.id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = {};

    const allowedStatus = ["active", "inactive", "banned"];
    if (allowedStatus.includes(status)) updateData.status = status;

    const allowedGender = ["male", "female", "other"];
    if (allowedGender.includes(gender)) updateData.gender = gender;

    if (typeof phone === "string") updateData.phone = phone;
    if (phone === null || phone === "") updateData.phone = null;

    if (typeof email === "string") updateData.email = email;

    if (typeof firstName === "string") updateData.firstName = firstName;
    if (typeof lastName === "string") updateData.lastName = lastName;

    if (dateOfBirth !== undefined) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
        updateData.dateOfBirth = dateOfBirth;
      } else {
        updateData.dateOfBirth = null;
      }
    }

    if (req.file) {
      if (currentUser.avatarPublicId) {
        try {
          await cloudinary.uploader.destroy(currentUser.avatarPublicId);
        } catch (err) {
          console.error("Delete old avatar failed:", err.message);
        }
      }

      updateData.avatar = req.file.path;
      updateData.avatarPublicId = req.file.filename;
    }

    const updated = await userService.update(req.params.id, updateData);

    return res.json({
      message: "User updated",
      user: updated,
    });
  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["active", "inactive", "banned"];
    if (!status || !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await userService.update(req.params.id, { status });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User status updated",
      user,
    });
  } catch (err) {
    console.error("changeStatus error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
