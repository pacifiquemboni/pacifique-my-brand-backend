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
    const { blogId, isLiked } = req.body;

    if (!isLiked) {
      // If isLiked is false, remove the document from the database
      await BlogLike.findOneAndDelete({ blogId: blogId });
      return res.json({ message: "Like removed successfully" });
    }

    let blogLike = await BlogLike.findOne({ blogId: blogId });

    if (!blogLike) {
      // If blogLike doesn't exist, create a new one
      blogLike = new BlogLike({ blogId: blogId });
    }

    // Update likes count based on isLiked value
    blogLike.likes = 1;

    await blogLike.save();
    res.json({ message: "Like status updated successfully" });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports= likesrouter