const express = require("express");
const Blog = require("../models/blogschema.js");
const authMiddleware = require("../middleware/authmiddleware.js");
const router = express.Router();
const BlogController = require("../controllers/blogcontroller.js");

router.use(express.json());
// authMiddleware.isAuthenticated,authMiddleware.checkRole,
// get all blogs
router.get("/blogs", BlogController.getAllBlogs);
//post a blog
router.post("/blog", BlogController.postOneBlog);

// get single blog

router.get(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  BlogController.getOneBlog
);

//update single blog
router.patch(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.updateOneBlog
);

// {router.patch("/blogs/:id",async (req,res)=>{
//   try{
//     const singleBlog = await Blog.findOne({_id:req.params.id})
//     if (req.body.title) {
//           singleBlog.title = req.body.title
//       }
//       if (req.body.author) {
//         singleBlog.author = req.body.author
//     }
//     if (req.body.intro) {
//       singleBlog.intro = req.body.intro
//     }
//     if (req.body.body) {
//       singleBlog.body = req.body.body
//     }
//     await singleBlog.save()
//     res.send(singleBlog)
//   } catch {
//     res.status(404)
//     res.send({ error: "Post doesn't exist!" })
// }
// })
// }

// delet a blog
router.delete(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.removeBlog
);
//comment on blog
router.post(
  "/blogs/:id/comment",
  authMiddleware.isAuthenticated,
  BlogController.commentOnBlog
);

module.exports = router;
