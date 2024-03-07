const mongoose = require("mongoose");
const express = require("express");
const Portfolio = require("../models/portfolioschema");
const { json } = require("body-parser");
const portfolioRouter = express.Router();
const authMiddleware = require("../middleware/authmiddleware.js");
const portfolioController = require("../controllers/portfoliocontrollers");

portfolioRouter.use(express.json());

//get all projects
portfolioRouter.get("/projects", portfolioController.getAllProjects);
//post a project
portfolioRouter.post("/project",authMiddleware.isAuthenticated,authMiddleware.checkRole, portfolioController.creatPortifolio);
// updating a project
portfolioRouter.patch("/projects/:id",authMiddleware.isAuthenticated,authMiddleware.checkRole, portfolioController.updateOneProj);
// remove a project
portfolioRouter.delete("/projects/:id",authMiddleware.isAuthenticated,authMiddleware.checkRole, portfolioController.removeProj);

module.exports = portfolioRouter;
