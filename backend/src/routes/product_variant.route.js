const express = require("express");
const router = express.Router({ mergeParams: true });

const variantController = require("../controllers/product_variant.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadVariant = require("../middlewares/uploadVariant.middleware");

router.post(
  "/",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  variantController.createVariant,
);

router.get("/", variantController.getVariantsByProduct);

router.put(
  "/:variantId",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  variantController.updateVariant,
);

router.patch(
  "/:variantId/images",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  uploadVariant.array("images", 10),
  variantController.updateVariantImages,
);

router.delete(
  "/:variantId",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  variantController.deleteVariant,
);

module.exports = router;
