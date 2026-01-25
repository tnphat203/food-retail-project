const express = require("express");
const upload = require("../middlewares/upload");

const router = express.Router();

// POST /api/upload
router.post("/upload", upload.single("image"), (req, res) => {
  res.status(200).json({
    message: "Upload thành công",
    imageUrl: req.file.path,
    publicId: req.file.filename,
  });
});

module.exports = router;
