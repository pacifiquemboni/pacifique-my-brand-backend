const express = require("express");
// const signupSchema = require('../modal/signupschema.js')
const authMiddleware = require("../middleware/authmiddleware.js")
const messageRouter = express.Router();
const messageController = require("../controllers/messagecontroller.js");

messageRouter.use(express.json());

//post message
/**
 * @swagger
 * tags:
 *   - name: "Messages"
 *     description: "Endpoints for sending messages"
 *
 * /sendmessage:
 *   post:
 *     summary: Send a message
 *     description: Send a message by providing names, email, and the message content.
 *     tags:
 *       - "Messages"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *                 description: The names of the sender.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the sender.
 *               message:
 *                 type: string
 *                 description: The content of the message.
 *             required:
 *               - names
 *               - email
 *               - message
 *     responses:
 *       200:
 *         description: Successfully sent the message.
 *         content:
 *           application/json:
 *             example:
 *               message: "Message sent successfully."
 *       400:
 *         description: Bad request. Invalid or missing parameters in the request.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid or missing parameters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */
messageRouter.post("/sendmessage", messageController.sendMessage);
//get all messages
/**
 * @swagger
 * tags:
 *   - name: "Messages"
 *     description: "Endpoints for retrieving messages"
 * 
 * /messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve information about all messages.
 *     tags:
 *       - "Messages"
 *     responses:
 *       200:
 *         description: Successfully retrieved all messages.
 *         content:
 *           application/json:
 *             example:
 *               data: [
 *                 {
 *                   _id: "1234567890",
 *                   names: "John Doe",
 *                   email: "john.doe@example.com",
 *                   message: "Hello, this is a sample message.",
 *                 },
 *                 // other message objects...
 *               ]
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */
messageRouter.get("/messages",authMiddleware.isAuthenticated,
authMiddleware.checkRole, messageController.getAllMessages);
//remove single message
/**
 * @swagger
 * tags:
 *   - name: "Messages"
 *     description: "Endpoints for managing messages"
 * 
 * /messages/{id}:
 *   delete:
 *     summary: Remove a single message
 *     description: Remove a message by providing its ID.
 *     tags:
 *       - "Messages"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the message to remove
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully removed the message.
 *         content:
 *           application/json:
 *             example:
 *               message: "Message removed successfully."
 *       404:
 *         description: Message not found. The provided ID does not match any existing message.
 *         content:
 *           application/json:
 *             example:
 *               error: "Message not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */

messageRouter.delete("/messages/:id",authMiddleware.isAuthenticated,
authMiddleware.checkRole, messageController.removeMessage);

module.exports = messageRouter;
