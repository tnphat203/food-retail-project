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
    const gender = (req.query.gender || "").trim();

    const result = await userService.getAllPaginated({
      page,
      limit,
      search,
      role,
      status,
      gender,
    });

    return res.json(result);
  } catch (err) {
    console.error("getAllUsers error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
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
exports.updateUserInfo = async (req, res) => {
  try {
    const { status, firstName, lastName, gender, phone, dateOfBirth, email } =
      req.body;

    const userId = req.params.id;

    if (req.body.role !== undefined) {
      return res.status(403).json({
        message: "You are not allowed to update role",
      });
    }

    if (req.user.role !== "admin" && req.user.id != userId) {
      return res.status(403).json({
        message: "You are not allowed to update this user",
      });
    }

    const currentUser = await userService.getById(userId);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updateData = {};

    if (status !== undefined) {
      const allowedStatus = ["active", "inactive", "banned"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Only admin can update status",
        });
      }

      updateData.status = status;
    }

    if (gender !== undefined) {
      const allowedGender = ["male", "female", "other"];

      if (!allowedGender.includes(gender)) {
        return res.status(400).json({
          message: "Invalid gender",
        });
      }

      updateData.gender = gender;
    }

    if (typeof firstName === "string") {
      const name = firstName.trim();

      if (name.length === 0 || name.length > 50) {
        return res.status(400).json({
          message: "First name invalid",
        });
      }

      updateData.firstName = name;
    }

    if (typeof lastName === "string") {
      const name = lastName.trim();

      if (name.length === 0 || name.length > 50) {
        return res.status(400).json({
          message: "Last name invalid",
        });
      }

      updateData.lastName = name;
    }

    if (phone !== undefined) {
      if (phone === null || phone === "") {
        updateData.phone = null;
      } else {
        const phoneRegex = /^0\d{9}$/;

        if (!phoneRegex.test(phone)) {
          return res.status(400).json({
            message: "Invalid phone number",
          });
        }

        updateData.phone = phone;
      }
    }

    if (typeof email === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Invalid email",
        });
      }

      const existed = await userService.getByEmail(email);

      if (existed && existed.id !== currentUser.id) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      updateData.email = email;
    }

    if (dateOfBirth !== undefined) {
      if (dateOfBirth === null || dateOfBirth === "") {
        updateData.dateOfBirth = null;
      } else {
        const date = new Date(dateOfBirth);

        if (isNaN(date.getTime())) {
          return res.status(400).json({
            message: "Invalid date of birth",
          });
        }

        updateData.dateOfBirth = dateOfBirth;
      }
    }

    const updated = await userService.update(userId, updateData);

    return res.json({
      message: "User updated successfully",
      user: updated,
    });
  } catch (err) {
    console.error("updateUserInfo error:", err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.updateUserAvatar = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({
        message: "Avatar file is required",
      });
    }

    const currentUser = await userService.getById(userId);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (currentUser.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(currentUser.avatarPublicId);
      } catch (err) {
        console.error("Delete old avatar failed:", err.message);
      }
    }

    const updateData = {
      avatar: req.file.path,
      avatarPublicId: req.file.filename,
    };

    const updated = await userService.update(userId, updateData);

    return res.json({
      message: "Avatar updated successfully",
      user: updated,
    });
  } catch (err) {
    console.error("updateUserAvatar error:", err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
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

exports.updateMyAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Avatar file is required",
      });
    }

    const currentUser = await userService.getById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (currentUser.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(currentUser.avatarPublicId);
      } catch (err) {
        console.error("Delete old avatar failed:", err.message);
      }
    }

    const updateData = {
      avatar: req.file.path,
      avatarPublicId: req.file.filename,
    };

    const updated = await userService.update(req.user.id, updateData);

    return res.json({
      message: "Avatar updated successfully",
      user: updated,
    });
  } catch (err) {
    console.error("updateMyAvatar error:", err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
