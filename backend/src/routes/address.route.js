const express = require("express");
const router = express.Router();

const addressController = require("../controllers/address.controller");
const {
  verifyAccessToken,
  requireAdmin,
} = require("../middlewares/auth.middleware");

router.get("/me", verifyAccessToken, addressController.getMyAddresses);
router.post("/", verifyAccessToken, addressController.createAddress);
router.put("/:id", verifyAccessToken, addressController.updateMyAddress);
router.delete("/:id", verifyAccessToken, addressController.deleteMyAddress);

router.patch(
  "/:id/default",
  verifyAccessToken,
  addressController.setDefaultAddress,
);

router.get(
  "/",
  verifyAccessToken,
  requireAdmin,
  addressController.getAllAddresses,
);
router.put(
  "/admin/:id",
  verifyAccessToken,
  requireAdmin,
  addressController.adminUpdateAddress,
);

module.exports = router;
