const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: `epam//${req.user?.id || "guest"}`,
      public_id: `user-${Date.now()}`,
      resource_type: "image",

      transformation: [
        {
          width: 500,
          height: 500,
          crop: "fill",
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Chỉ cho phép upload jpg, png, webp"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
