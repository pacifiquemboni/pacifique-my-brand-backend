const express = require("express");
const comments = require("../models/comment.js");
const authMiddleware = require("../middleware/authmiddleware.js");
const commentrouter = express.Router();
const CommentController = require("../controllers/commentscontroller.js");


commentrouter.use(express.json());

// post comment

commentrouter.post("/comment", CommentController.postOneComment);

// get blogs according to blog id
commentrouter.get('/comments/:id',authMiddleware.isAuthenticated,async (req, res) => {
  try {
    const blogid = req.params.id;

    // Assuming you have a Comment model with a field named 'blogId' that stores the ID of the associated blog
    const allcomment = await comments.find({ blogid });

    res.status(200).json({ success: true, allcomment });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ success: false, error: 'Error fetching comments' });
  }
});

module.exports = commentrouter;