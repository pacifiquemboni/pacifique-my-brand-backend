const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema({
  name: String,
  description: String,
  started: { type: Date, default: Date.now },
  ended: { type: Date },
  image: String,
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
