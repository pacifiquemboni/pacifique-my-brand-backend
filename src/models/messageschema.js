const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  names: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("Messages", messageSchema);
