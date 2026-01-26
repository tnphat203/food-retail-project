const jwt = require("jsonwebtoken");
const { ENV } = require("../config/env");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  // 2. Extract token
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, ENV.JWT.SECRET);

    // 4. Attach user info
    req.user = decoded; // { id, role, email }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
