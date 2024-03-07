const { model } = require("mongoose");
const Messages = require("../models/messageschema");

class messageController {
  //send message
  static async sendMessage(req, res) {
    try {
      const { names, email, message } = req.body;
      let errors = [];
  
      if (!/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(String(email))) {
        errors.push("Email is not valid.");
      }
  
      if (!String(message).trim()) {
        errors.push("Message is required");
      }
  
      if (errors.length > 0) {
        return res.status(400).json({
          error: errors.join(" "),
        });
      }
  
      const sendmessage = await Messages.create({
        names,
        email,
        message,
      });
  
      return res.status(200).json({
        status: "message sent",
        data: sendmessage,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  
  //get all messages
  static async getAllMessages(req, res) {
    try {
      const allmessages = await Messages.find();
      return res.status(200).json({
        status: "All messages",
        data: allmessages,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  // remove message
  static async removeMessage(req, res) {
    try {
      await Messages.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        status: "Message deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "delete is not successfull!",
      });
    }
  }
}

module.exports = messageController;
