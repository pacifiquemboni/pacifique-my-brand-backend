const express = require("express");
const uploadrouter = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

uploadrouter.post("/upload", upload.single("image"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result.url,
    });
  });
});

module.exports = uploadrouter;
