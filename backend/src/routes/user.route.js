const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload");

router.get("/me", authMiddleware.verifyAccessToken, userController.getMe);

router.put(
  "/me",
  authMiddleware.verifyAccessToken,
  upload.single("avatar"),
  userController.updateMe,
);

router.get(
  "/",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  userController.getAllUsers,
);

router.get(
  "/:id",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  userController.getUserById,
);

router.put(
  "/:id",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  upload.single("avatar"),
  userController.updateUser,
);

router.patch(
  "/:id/status",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  userController.changeStatus,
);

module.exports = router;
