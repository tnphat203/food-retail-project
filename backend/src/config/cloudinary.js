const cloudinary = require("cloudinary").v2;
const { ENV } = require("./env");

cloudinary.config({
  cloud_name: ENV.CLOUDINARY.CLOUD_NAME,
  api_key: ENV.CLOUDINARY.API_KEY,
  api_secret: ENV.CLOUDINARY.API_SECRET,
});

module.exports = cloudinary;
