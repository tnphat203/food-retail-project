const express = require("express");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Không có file upload" });
  }

  res.json({
    url: req.file.path,
    publicId: req.file.filename,
  });
});

module.exports = router;
