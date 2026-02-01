const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/me", authMiddleware.verifyAccessToken, userController.getMe);
router.put("/me", authMiddleware.verifyAccessToken, userController.updateMe);

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
  userController.updateUser,
);

router.patch(
  "/:id/status",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  userController.changeStatus,
);

module.exports = router;
