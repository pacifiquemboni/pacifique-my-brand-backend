const Portfolio = require("../models/portfolioschema");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("portfolioImage");

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
      upload(req, res, (err) => {
        if (err) {
          console.log(err);
        } else {
          const newPortfolio = new Portfolio({
            name: req.body.name,
            description: req.body.description,
            image: {
              data: req.file.filename,
              contentType: "image/png",
            },
          });
          newPortfolio.save();
          return res.status(200).json({
            message: "Portfolio created successfully",
            data: newPortfolio,
          });
        }
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
      const { name, description } = req.body;
      if (name) {
        singleProj.name = name;
      }

      if (description) {
        singleProj.description = description;
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
  // deleting a blog
  static async removeProj(req, res) {
    try {
      await Portfolio.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        status: "blog deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "delete is not successfull!",
      });
    }
  }
}

module.exports = portfolioController;
