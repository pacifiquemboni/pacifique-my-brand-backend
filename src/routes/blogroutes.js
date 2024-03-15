const express = require("express");
const Blog = require("../models/blogschema.js");
const authMiddleware = require("../middleware/authmiddleware.js");
const router = express.Router();
const BlogController = require("../controllers/blogcontroller.js");

/**
 * @swagger
 * tags:
 *   - name: "Home"
 *     description: "Endpoints for Routing Home"
 * /:
 *   get:
 *     summary: Get information about the API
 *     description: Returns Home Route.
 *     tags:
 *       - "Home"
 *     responses:
 *       200:
 *         description: Successful response with API information.
 *         content:
 *           application/json:
 *             example:
 *               name: "Home APi"
 *               version: "1.0.0"
 *               description: "Home routing"
 *               status: "Running"
 */

/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 * /blogs:
 *   get:
 *     summary: Thi is API for Retrieving all blogs fro Database
 *     description: Returns All Blogs  found In Database.
 *     tags:
 *       - "Blogs"
 *     responses:
 *       200:
 *         description: Successful retrieved all blogs stored in dayyabase.
 *         content:
 *           application/json:
 *             example:
 *               name: "Get all blogd"
 *               version: "1.0.0"
 *               description: "retrieving blogs stored in database"
 *               status: "Running"
 */

router.use(express.json());
// authMiddleware.isAuthenticated,authMiddleware.checkRole,

router.get("/blogs", BlogController.getAllBlogs);
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 *
 * /blog:
 *   post:
 *     summary: Create a new blog
 *     description: Endpoint to create a new blog.
 *     tags:
 *       - "Blogs"
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog.
 *               author:
 *                 type: string
 *                 description: The author of the blog.
 *               intro:
 *                 type: string
 *                 description: Introduction to the blog.
 *               body:
 *                 type: string
 *                 description: The main content of the blog.
 *               image:  
 *                 type: string
 *                 format: uri
 *                 description: URL of the image.
 *     responses:
 *       201:
 *         description: Blog created successfully.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       403:
 *         description: Forbidden. User lacks necessary permissions.
 *       500:
 *         description: Internal server error.
 */


//post a blog
router.post(
  "/blog",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.postOneBlog
);
//////////////////////////// this is used i testing
router.post(
  "/postblog",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.postsingleBlog
);

// get single blog
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 * 
 * /blogs/{id}:
 *   get:
 *     summary: Retrieve a single blog
 *     description: Returns a single blog from the database.
 *     tags:
 *       - "Blogs"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved a single blog from the database.
 *         content:
 *           application/json:
 *             example:
 *               name: "Get single blog"
 *               version: "1.0.0"
 *               description: "Retrieving blogs stored in the database"
 *               status: "Running"
 *       404:
 *         description: Blog not found. The provided ID does not match any existing blog.
 *         content:
 *           application/json:
 *             example:
 *               error: "Blog not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */

router.get(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  BlogController.getOneBlog
);

//update single blog
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 * 
 * /blogs/{id}:
 *   patch:
 *     summary: Update a single blog
 *     description: Update the content of a single blog in the database.
 *     tags:
 *       - "Blogs"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to update
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the blog.
 *               intro:
 *                 type: string
 *                 description: The updated introduction to the blog.
 *               body:
 *                 type: string
 *                 description: The updated main content of the blog.
 *     responses:
 *       200:
 *         description: Successfully updated the blog in the database.
 *         content:
 *           application/json:
 *             example:
 *               message: "Blog updated successfully."
 *       400:
 *         description: Bad request. Invalid or missing parameters in the request.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid or missing parameters."
 *       401:
 *         description: Unauthorized. User not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized. User not authenticated."
 *       403:
 *         description: Forbidden. User lacks necessary permissions.
 *         content:
 *           application/json:
 *             example:
 *               error: "Forbidden. User lacks necessary permissions."
 *       404:
 *         description: Blog not found. The provided ID does not match any existing blog.
 *         content:
 *           application/json:
 *             example:
 *               error: "Blog not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */


router.patch(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.updateOneBlog
);

// delet a blog
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 * 
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     description: Deletes a blog from the database.
 *     tags:
 *       - "Blogs"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Blog deleted successfully.
 *       404:
 *         description: Blog not found. The provided ID does not match any existing blog.
 *         content:
 *           application/json:
 *             example:
 *               error: "Blog not found"
 *       403:
 *         description: Forbidden. User lacks necessary permissions to delete the blog.
 *         content:
 *           application/json:
 *             example:
 *               error: "Forbidden"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */

router.delete(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.removeBlog
);

//comment on blog
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 *
 * /blogs/{id}/comment:
 *   post:
 *     summary: Comment on a blog
 *     description: Add a comment to a specific blog post.
 *     tags:
 *       - "Blogs"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to comment on
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The text of the comment.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *       400:
 *         description: Bad request. Invalid or missing parameters in the request.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       403:
 *         description: Forbidden. User lacks necessary permissions.
 *       404:
 *         description: Blog not found. The provided ID does not match any existing blog.
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/blogs/:id/comment",
  authMiddleware.isAuthenticated,
  BlogController.commentOnBlog
);

router.get(
  "/blogs/:id/comments",
  authMiddleware.isAuthenticated,
  BlogController.commentOnBlog
);

module.exports = router;
