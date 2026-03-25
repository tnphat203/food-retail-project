const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  productController.createProduct,
);

router.get("/", productController.getProducts);
router.get("/top-rated", productController.getTopRatedProducts);
router.get("/:id", productController.getProductById);

router.put(
  "/:id",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  productController.updateProduct,
);

router.delete(
  "/:id",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  productController.deleteProduct,
);

router.post(
  "/:productId/variants",
  authMiddleware.verifyAccessToken,
  authMiddleware.requireAdmin,
  productController.createVariant,
);

router.get("/:productId/variants", productController.getVariants);

module.exports = router;
