module.exports = (req, res, next) => {
  // auth.middleware PHẢI chạy trước
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // Check role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin permission required",
    });
  }

  next();
};
