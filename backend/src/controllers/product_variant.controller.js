const productVariantService = require("../services/product_variant.service");

exports.createVariant = async (req, res) => {
  try {
    const { productId } = req.params;
    const payload = req.body;

    const variant = await productVariantService.createVariant(
      productId,
      payload,
    );
    if (!variant) return res.status(404).json({ message: "Product not found" });

    return res.status(201).json({ message: "Variant created", variant });
  } catch (err) {
    console.error("createVariant error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const payload = req.body;

    const variant = await productVariantService.updateVariant(
      productId,
      variantId,
      payload,
    );
    if (!variant) return res.status(404).json({ message: "Variant not found" });

    return res.json({ message: "Variant updated", variant });
  } catch (err) {
    console.error("updateVariant error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateVariantImages = async (req, res) => {
  try {
    const { productId, variantId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = await productVariantService.updateVariantImages(
      productId,
      variantId,
      req.files,
    );

    if (!images) {
      return res.status(404).json({ message: "Variant not found" });
    }

    return res.json({
      message: "Images updated",
      images,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getVariantsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const variants =
      await productVariantService.getVariantsByProduct(productId);
    return res.json(variants);
  } catch (err) {
    console.error("getVariantsByProduct error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const { variantId } = req.params;
    const deleted = await productVariantService.deleteVariant(variantId);
    if (!deleted) return res.status(404).json({ message: "Variant not found" });

    return res.json({ message: "Variant deleted" });
  } catch (err) {
    console.error("deleteVariant error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
