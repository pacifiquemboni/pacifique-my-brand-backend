const mongoose = require("mongoose");

const blogLikeSchema = new mongoose.Schema({
  blogId: {
    type:String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
});

const BlogLike = mongoose.model("BlogLike", blogLikeSchema);

module.exports = BlogLike;
