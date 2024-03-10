const mongoose = require("mongoose");
const express = require("express");
const Portfolio = require("../models/portfolioschema");
const { json } = require("body-parser");
const portfolioRouter = express.Router();
const authMiddleware = require("../middleware/authmiddleware.js");
const portfolioController = require("../controllers/portfoliocontrollers");

portfolioRouter.use(express.json());

//get all projects
/**
 * @swagger
 * tags:
 *   - name: "Projects"
 *     description: "Endpoints for managing projects"
 *
 * /projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve information about all projects.
 *     tags:
 *       - "Projects"
 *     responses:
 *       200:
 *         description: Successfully retrieved all projects.
 *         content:
 *           application/json:
 *             example:
 *               data: [
 *                 {
 *                   _id: "1234567890",
 *                   title: "Project 1",
 *                   description: "Description of Project 1.",
 *                   // other project properties...
 *                 },
 *                 // other project objects...
 *               ]
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */

portfolioRouter.get("/projects", portfolioController.getAllProjects);
//post a project
/**
 * @swagger
 * tags:
 *   - name: "Projects"
 *     description: "Endpoints for managing projects"
 *
 * /project:
 *   post:
 *     summary: Post a project
 *     description: Create a new project by providing project details and uploading an image.
 *     tags:
 *       - "Projects"
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the project.
 *               description:
 *                 type: string
 *                 description: The description of the project.
 *               portfolioImage:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *             required:
 *               - name
 *               - description
 *               - portfolioImage
 *     responses:
 *       200:
 *         description: Successfully created a new project.
 *         content:
 *           application/json:
 *             example:
 *               message: "Project created successfully."
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
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */

portfolioRouter.post(
  "/project",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  portfolioController.creatPortifolio
);
// updating a project
/**
 * @swagger
 * tags:
 *   - name: "Projects"
 *     description: "Endpoints for managing projects"
 *
 * /projects/{id}:
 *   patch:
 *     summary: Update an existing project
 *     description: Update the details of an existing project by providing its ID and the updated information.
 *     tags:
 *       - "Projects"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project to update
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
 *               name:
 *                 type: string
 *                 description: The updated name of the project.
 *               description:
 *                 type: string
 *                 description: The updated description of the project.
 *             required:
 *               - name
 *               - description
 *     responses:
 *       200:
 *         description: Successfully updated the project.
 *         content:
 *           application/json:
 *             example:
 *               status: "Portfolio updated successfully"
 *               data: {
 *                 _id: "1234567890",
 *                 name: "Updated Project Name",
 *                 description: "Updated project description.",
 *                 // other project properties...
 *               }
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
 *         description: Project not found. The provided ID does not match any existing project.
 *         content:
 *           application/json:
 *             example:
 *               error: "Project not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */

portfolioRouter.patch(
  "/projects/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  portfolioController.updateOneProj
);
// remove a project
/**
 * @swagger
 * tags:
 *   - name: "Projects"
 *     description: "Endpoints for managing projects"
 * 
 * /projects/{id}:
 *   delete:
 *     summary: Remove a project
 *     description: Remove a project by providing its ID.
 *     tags:
 *       - "Projects"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project to remove
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully removed the project.
 *         content:
 *           application/json:
 *             example:
 *               message: "Project removed successfully."
 *       404:
 *         description: Project not found. The provided ID does not match any existing project.
 *         content:
 *           application/json:
 *             example:
 *               error: "Project not found."
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
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */

portfolioRouter.delete(
  "/projects/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  portfolioController.removeProj
);

module.exports = portfolioRouter;
