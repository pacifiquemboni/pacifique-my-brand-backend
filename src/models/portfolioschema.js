const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema({
  name: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
