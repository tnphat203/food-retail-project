const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const requireAdmin = require("../middlewares/requireAdmin.middleware");

router.get("/me", authMiddleware, userController.getMe);
router.put("/me", authMiddleware, userController.updateMe);

router.get("/", authMiddleware, requireAdmin, userController.getAllUsers);
router.get("/:id", authMiddleware, requireAdmin, userController.getUserById);
router.put("/:id", authMiddleware, requireAdmin, userController.updateUser);
router.patch(
  "/:id/status",
  authMiddleware,
  requireAdmin,
  userController.changeStatus,
);

module.exports = router;
