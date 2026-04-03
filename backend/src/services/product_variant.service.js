const { Sequelize } = require("sequelize");
const sequelize = require("../config/sequelize");
const ProductVariant = require("../models/product_variant.model");
const ProductVariantWeight = require("../models/product_variant_weight.model");
const cloudinary = require("../config/cloudinary");

exports.createVariant = async (productId, data) => {
  const variant = await ProductVariant.create({ ...data, productId });
  if (Array.isArray(data.weightVariants)) {
    for (const w of data.weightVariants) {
      await ProductVariantWeight.create({ ...w, variantId: variant.id });
    }
  }
  return await ProductVariant.findByPk(variant.id, {
    include: [{ model: ProductVariantWeight, as: "weights" }],
  });
};

exports.updateVariant = async (productId, variantId, data) => {
  return await sequelize.transaction(async (t) => {
    const variant = await ProductVariant.findOne({
      where: { id: variantId, productId },
      transaction: t,
    });
    if (!variant) return null;

    await variant.update(
      {
        flavor: data.flavor ?? variant.flavor,
        flavorCode: data.flavorCode ?? variant.flavorCode,
        status: data.status ?? variant.status,
        images: data.images ?? variant.images,
      },
      { transaction: t },
    );

    if (Array.isArray(data.weights)) {
      for (const w of data.weights) {
        if (w.id) {
          const existing = await ProductVariantWeight.findOne({
            where: { id: w.id, variantId },
            transaction: t,
          });
          if (existing) {
            await existing.update(
              {
                weight: w.weight ?? existing.weight,
                price: w.price ?? existing.price,
                stock: w.stock ?? existing.stock,
                discountPrice: w.discountPrice ?? existing.discountPrice,
                discountType: w.discountType ?? existing.discountType,
                discountPercent: w.discountPercent ?? existing.discountPercent,
              },
              { transaction: t },
            );
          }
        } else {
          await ProductVariantWeight.create(
            { ...w, variantId },
            { transaction: t },
          );
        }
      }
    }

    return await ProductVariant.findByPk(variant.id, {
      include: [{ model: ProductVariantWeight, as: "weights" }],
      transaction: t,
    });
  });
};

exports.updateVariantImages = async (productId, variantId, files) => {
  const variant = await ProductVariant.findOne({
    where: { id: variantId, productId },
  });

  if (!variant) return null;

  if (Array.isArray(variant.images)) {
    for (const img of variant.images) {
      if (img.publicId) {
        try {
          await cloudinary.uploader.destroy(img.publicId);
        } catch (e) {
          console.error(e.message);
        }
      }
    }
  }

  const images = files.map((file) => ({
    url: file.path,
    publicId: file.filename,
  }));

  await variant.update({ images });

  return images;
};

exports.getVariantsByProduct = async (productId) => {
  return await ProductVariant.findAll({
    where: { productId },
    include: [{ model: ProductVariantWeight, as: "weights" }],
  });
};

exports.deleteVariant = async (variantId) => {
  const variant = await ProductVariant.findByPk(variantId);
  if (!variant) return null;
  await variant.destroy();
  return true;
};
