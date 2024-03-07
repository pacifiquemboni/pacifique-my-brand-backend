const mongoose = require("mongoose");
const express = require("express");
const Portfolio = require("../models/portfolioschema");
const { json } = require("body-parser");
const portfolioRouter = express.Router();
const portfolioController = require("../controllers/portfoliocontrollers");

portfolioRouter.use(express.json());

//get all projects
portfolioRouter.get("/projects", portfolioController.getAllProjects);
//post a project
portfolioRouter.post("/project", portfolioController.creatPortifolio);
// updating a project
portfolioRouter.patch("/projects/:id", portfolioController.updateOneProj);
// remove a project
portfolioRouter.delete("/projects/:id", portfolioController.removeProj);

module.exports = portfolioRouter;
