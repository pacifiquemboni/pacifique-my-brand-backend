const Portfolio = require("../models/portfolioschema");
const multer = require("multer");


class portfolioController {
  //get all projects
  static async getAllProjects(req, res) {
    const allprojects = await Portfolio.find();
    return res.status(200).json({
      message: "Portfolio saved",
      data: allprojects,
    });
  }

  static async creatPortifolio(req, res) {
    try {
      const newPortfolio = new Portfolio({
        name: req.body.name,
        description: req.body.description,
        started: req.body.started,
        ended: req.body.ended,
        image: req.body.image,
      });
      await newPortfolio.save();
      return res.status(200).json({
        message: "Portfolio created successfully",
        data: newPortfolio,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
}

  // Update an existing portfolio

  static async updateOneProj(req, res) {
    try {
      const singleProj = await Portfolio.findOne({ _id: req.params.id });
      const { name, description, started,ended } = req.body;
      if (name) {
        singleProj.name = name;
      }

      if (description) {
        singleProj.description = description;
      }
      if (started) {
        singleProj.started = started;
      }
      if (ended) {
        singleProj.ended = ended;
      }

      const updatePortfolio = await Portfolio.findOneAndUpdate(
        { _id: req.params.id },
        singleProj,
        { new: true }
      );
      return res.status(200).json({
        status: "Portfolio updated successfully",
        data: updatePortfolio,
      });
    } catch (error) {
      return res.status(500).json({
        message: "update is not successfull!",
      });
    }
  }
  // deleting a project
  static async removeProj(req, res) {
    try {
      await Portfolio.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        status: "project deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "delete is not successfull!",
      });
    }
  }
}

module.exports = portfolioController;
