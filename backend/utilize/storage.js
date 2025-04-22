const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");  // Ensure this is where your Cloudinary configuration is located.
const multer = require("multer");


// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Products", // The folder where images will be stored in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // Supported image formats
    transformation: [{ width: 500, height: 500, crop: "limit" }]  // Example transformation (resize)
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

module.exports = upload;
