const express = require('express')
const BlogLike = require('../models/likesschema.js')
const authMiddleware = require("../middleware/authmiddleware.js");
const likesrouter = express.Router()

likesrouter.use(express.json());


likesrouter.get("/likes/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const result = await BlogLike.find({blogId });
    
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error retrieving likes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

likesrouter.post("/like", async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({ error: "Missing 'blogId' in request body." });
    }

    let blogLike = await BlogLike.findOne({ blogId: blogId });

    if (!blogLike) {
      // If blogLike doesn't exist, create a new one and set likes count to 1
      blogLike = new BlogLike({ blogId: blogId, likes: 1 });
      await blogLike.save();
      return res.json({ message: "Like added successfully" });
    }

    // If blogLike exists, toggle like status
    if (blogLike.likes === 1) {
      // If the post is already liked, remove the like
      await BlogLike.findOneAndDelete({ blogId: blogId });
      return res.json({ message: "Like removed successfully" });
    } else {
      // If the post is not liked, add the like
      blogLike.likes = 1;
      await blogLike.save();
      return res.json({ message: "Like added successfully" });
    }
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports= likesrouter