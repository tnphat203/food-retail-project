const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { ENV } = require("../config/env");

/**
 * POST /api/auth/register
 * Public – chỉ đăng ký customer
 */
exports.register = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    // 1. Required (logic)
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // 2. Normalize (logic)
    email = email.toLowerCase().trim();

    // 3. Business rule: email must be unique
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // 4. Hash password (logic)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    // ❗ KHÔNG nhận role / status từ req.body
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Register success",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    return res.status(500).json({ message: "Register failed" });
  }
};

/**
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 1. Required (logic)
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    email = email.toLowerCase().trim();

    // 2. Find user
    const user = await User.findOne({ where: { email } });

    // ❗ Không lộ user tồn tại hay không
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Business rule: user must be active
    if (user.status !== "active") {
      return res.status(403).json({
        message: "Account is not active",
      });
    }

    // 4. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 5. Issue token
    const token = jwt.sign({ id: user.id, role: user.role }, ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });

    return res.json({
      message: "Login success",
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};
