const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { ENV } = require("../config/env");

exports.register = async (req, res) => {
  try {
    let { firstName, lastName, gender, phone, email, password } = req.body;

    if (!firstName || !lastName || !gender || !phone || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    firstName = String(firstName).trim();
    lastName = String(lastName).trim();
    email = String(email).toLowerCase().trim();
    phone = String(phone).trim();
    gender = String(gender).trim();

    const allowedGender = ["male", "female", "other"];
    if (!allowedGender.includes(gender)) {
      return res.status(400).json({ message: "Gender is invalid" });
    }

    if (!/^0\d{9}$/.test(phone)) {
      return res.status(400).json({ message: "Phone number is invalid" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(409).json({
        message: "Phone already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      gender,
      phone,
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

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account is not active" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      ENV.JWT.ACCESS_SECRET,
      { expiresIn: ENV.JWT.ACCESS_EXPIRES_IN },
    );

    const refreshToken = jwt.sign({ id: user.id }, ENV.JWT.REFRESH_SECRET, {
      expiresIn: ENV.JWT.REFRESH_EXPIRES_IN,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login success",
      accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        gender: user.gender,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ message: "Missing refresh token" });
    }

    const payload = jwt.verify(refreshToken, ENV.JWT.REFRESH_SECRET);

    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account is not active" });
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      ENV.JWT.ACCESS_SECRET,
      { expiresIn: ENV.JWT.ACCESS_EXPIRES_IN },
    );

    return res.json({
      message: "Refresh success",
      accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        gender: user.gender,
        phone: user.phone,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("refresh_token", {
    path: "/api/auth/refresh",
  });

  return res.json({ message: "Logout success" });
};
