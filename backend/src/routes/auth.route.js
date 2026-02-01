const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post(
  "/create-admin",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  authController.createAdmin,
);

router.get("/me", authMiddleware.verifyAccessToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
