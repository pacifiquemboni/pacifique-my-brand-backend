const comment = require('../models/comment.js');
const comments = require('../models/comment.js')

const mongoose = require('mongoose');


class CommentController{
  static async postOneComment(req, res){
    try {
      const {blogid, names, comment} = req.body;
      if(!blogid){
        return res.status(400).json({
          error: "blog Id not Found",
        });
      }
      if(!names){
        return res.status(400).json({
          error: "name is required",
        });
      }
      if(!comment){
        return res.status(400).json({
          error: "comment is required",
        });
      }
      // const loggedInUserName = req.user ? req.user.name : "Anonymous";
       const postcomment = new comments({
        blogid: blogid,
        names: names,
        comment:comment
       })

       await postcomment.save();
       return res.status(201).json({
        message: "comment created successfully",
        data: postcomment,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  static async getAllComment(req,res){
    try {
      const allcomments = await comments.find();
      
      return res.status(200).json({
        status: "Posted comments",
        data: allcomments,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

}

module.exports = CommentController;