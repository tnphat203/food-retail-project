const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");

router.post("/", controller.createCategory);
router.get("/", controller.getAllCategories);
router.get("/tree", controller.getCategoryTree);
router.get("/slug/:slug", controller.getCategoryBySlug);
router.put("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
