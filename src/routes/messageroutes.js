const express = require("express")
// const signupSchema = require('../modal/signupschema.js')
// const authMiddleware = require("../middleware/authmiddleware.js")
const messageRouter = express.Router()
const messageController = require("../controllers/messagecontroller.js")

messageRouter.use(express.json());

//post message
messageRouter.post("/sendmessage", messageController.sendMessage)
//get all messages
messageRouter.get("/messages", messageController.getAllMessages)
//remove single message
messageRouter.delete("/messages/:id", messageController.removeMessage)





module.exports = messageRouter;