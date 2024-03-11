const Blog = require("../models/blogschema.js");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("blogImage");

class BlogController {
  static async getAllBlogs(req, res) {
    const blogs = await Blog.find();
    // if (blogs.length === 0) {
    //   return res.status(200).json({
    //     status: "success",
    //     message: "There is no blogs posted",
    //   });
    // }
    return res.status(200).json({
      status: "Posted blogs",
      data: blogs,
    });
  }
 
  static async postOneBlog(req, res) {
    try {
      upload(req, res, (err) => {
        if (err) {
          console.log(err);
        } else {
          const { title, author, intro, body } = req.body;
          if (!title || !intro || !body) {
            return res.status(400).json({
              error: "Title, Introduction, and Body are required",
            });
          }
          // if (!req.file) {
          //   return res.status(400).json({
          //     error: "Image is required",
          //   });
          // }
          const loggedInUserName = req.user ? req.user.name : "Anonymous";
          const postblog = new Blog({
            title: title,
            author: loggedInUserName,
            intro: intro,
            body: body,

            image: {
              data: req.file.filename,
              contentType: "image/png",
            },
          });
          postblog.save();
          return res.status(200).json({
            message: "Blog created successfully",
            data: postblog,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  ////////////////////////////////////this is used in testing/////////////////////////
  static async postsingleBlog(req, res) {
    try {
      upload(req, res, (err) => {
        if (err) {
          console.log(err);
        } else {
          const { title, author, intro, body } = req.body;
          if (!title || !intro || !body) {
            return res.status(400).json({
              error: "Title, Introduction, and Body are required",
            });
          }
          // if (!req.file) {
          //   return res.status(400).json({
          //     error: "Image is required",
          //   });
          // }
          const loggedInUserName = req.user ? req.user.name : "Anonymous";
          const postblog = new Blog({
            title: title,
            author: loggedInUserName,
            intro: intro,
            body: body,
          });
          postblog.save();
          return res.status(201).json({
            status:'Success',
            message: "Blog created successfully",
            data: postblog,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  //add comment
  static async commentOnBlog(req, res) {
    try {
      const { names, comment } = req.body;
      const blogId = req.params.id;
      if (!blogId) {
        return res.status(400).json({
          error: "blogId does not exist",
        });
      }
      const blogObjectId = new ObjectId(blogId);
      // console.log("blogId:", blogId);
      const loggedInUserName = req.user ? req.user.name : "Anonymous";
      const postComment = {
        names: loggedInUserName,
        timeadded: new Date(),
        comment,
      };

      const updateBlog = await Blog.findOneAndUpdate(
        { _id: blogObjectId },
        {
          $push: {
            comments: postComment,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        data: updateBlog,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  //get single blog
  static async getOneBlog(req, res) {
    try {
      const singleBlog = await Blog.findOne({ _id: req.params.id });
      if (singleBlog) {
        return res.status(200).json({
          status: "blog exist",
          data: singleBlog,
        });
      }
      return res.status(200).json({
        message: "blog with that id is deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: "provided ID doen't exist!",
      });
    }
  }
  //updating single blog
  static async updateOneBlog(req, res) {
    try {
      const singleBlog = await Blog.findOne({ _id: req.params.id });
      const { title, author, intro, body } = req.body;
      if (title) {
        singleBlog.title = title;
      }
      if (intro) {
        singleBlog.intro = intro;
      }
      if (body) {
        singleBlog.body = body;
      }
      const updateBlog = await Blog.findOneAndUpdate(
        { _id: req.params.id },
        singleBlog,
        { new: true }
      );
      return res.status(200).json({
        status: "blog updated successfully",
        data: updateBlog,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  // deleting a blog
  static async removeBlog(req, res) {
    try {
      await Blog.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        status: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: "delete is not successfull!",
      });
    }
  }
}

module.exports = BlogController;
