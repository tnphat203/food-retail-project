const express = require("express");
const multer = require("multer");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: "Lỗi upload: " + err.message,
      });
    }

    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Không có file upload",
      });
    }

    const versionMatch = req.file.path.match(/\/v(\d+)\//);
    const version = versionMatch ? versionMatch[1] : null;

    res.json({
      url: req.file.path,
      publicId: req.file.filename,
      version,
    });
  });
});

module.exports = router;
