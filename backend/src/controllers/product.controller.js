const productService = require("../services/product.service");

exports.createProduct = async (req, res) => {
  try {
    const { name, slug, shortDescription, brand, tags, categoryId } = req.body;

    const product = await productService.createProduct({
      name,
      slug,
      shortDescription,
      brand,
      tags,
      categoryId,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error("createProduct error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProductPartial = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("updateProductPartial error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "10", 10), 1),
      100,
    );
    const search = (req.query.search || "").trim();
    const categoryId = req.query.categoryId;
    const status = req.query.status;
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order || "DESC";

    const result = await productService.getAllPaginated({
      page,
      limit,
      search,
      categoryId,
      status,
      sortBy,
      order,
    });

    return res.json(result);
  } catch (err) {
    console.error("getProducts error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("updateProduct error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Product not found" });

    return res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createVariant = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { flavor, flavorCode, images, weightVariants = [] } = req.body;

    const variant = await productService.createVariant(productId, {
      flavor,
      flavorCode,
      images,
    });

    if (!variant) return res.status(404).json({ message: "Product not found" });

    for (const w of weightVariants) {
      await productService.createVariantWeight(variant.id, w);
    }

    const variantWithWeights =
      await productService.getVariantsByProduct(productId);
    const createdVariant = variantWithWeights.find((v) => v.id === variant.id);

    return res
      .status(201)
      .json({ message: "Variant created", variant: createdVariant });
  } catch (err) {
    console.error("createVariant error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getVariants = async (req, res) => {
  try {
    const variants = await productService.getVariantsByProduct(
      req.params.productId,
    );
    return res.json(variants);
  } catch (err) {
    console.error("getVariants error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTopRatedProducts = async (req, res) => {
  try {
    const result = await productService.getAllPaginated({
      page: 1,
      limit: 10,
      status: "active",
      sortBy: "ratingAverage",
      order: "DESC",
    });

    return res.json(result);
  } catch (err) {
    console.error("getTopRatedProducts error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
