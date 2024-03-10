const express = require("express");
// const signupSchema = require('../modal/signupschema.js')
const authMiddleware = require("../middleware/authmiddleware.js");
const signupRouter = express.Router();
const signController = require("../controllers/signupcontroller.js");

signupRouter.use(express.json());
// authMiddleware.isAuthenticated,authMiddleware.checkRole,
//get all users
/**
 * @swagger
 * tags:
 *   - name: "Users"
 *     description: "Endpoints for managing user information"
 *
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Endpoint to retrieve all users from the database.
 *     tags:
 *       - "Users"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users.
 *         content:
 *           application/json:
 *             example:
 *               users:
 *                 - _id: "user_id_1"
 *                   names: "User1"
 *                   email: "user1@example.com"
 *                   role: "user"
 *                 - _id: "user_id_2"
 *                   names: "User2"
 *                   email: "user2@example.com"
 *                   role: "admin"
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       403:
 *         description: Forbidden. User lacks necessary permissions.
 *       500:
 *         description: Internal server error.
 */

signupRouter.get(
  "/users",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  signController.getAllSignUpUsers
);
//register a user
/**
 * @swagger
 * tags:
 *   - name: "Users"
 *     description: "Endpoints for user registration and authentication"
 *
 * /user:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user using JSON raw data.
 *     tags:
 *       - "Users"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *               confpass:
 *                 type: string
 *                 format: password
 *                 description: Confirm password.
 *               role:
 *                 type: string
 *                 description: The role of the user. Defaults to 'user'.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 _id: "user_id"
 *                 names: "New User"
 *                 email: "newuser@example.com"
 *                 role: "user"
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *       409:
 *         description: Conflict. User with the provided email already exists.
 *       500:
 *         description: Internal server error.
 */

signupRouter.post("/user", signController.registerUser);

// get single user
/**
 * @swagger
 * tags:
 *   - name: "Users"
 *     description: "Endpoints for managing user-related information"
 * 
 * /users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     description: Retrieve information about a single user based on their ID.
 *     tags:
 *       - "Users"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 _id: "1234567890",
 *                 username: "exampleUser",
 *                 email: "user@example.com",
 *                 // other user properties...
 *               }
 *       404:
 *         description: User not found. The provided ID does not match any existing user.
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */
signupRouter.get(
  "/users/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  signController.getOneUser
);

//update user
/**
 * @swagger
 * tags:
 *   - name: "Users"
 *     description: "Endpoints for managing user-related information"
 * 
 * /users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Update information about a user based on their ID.
 *     tags:
 *       - "Users"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to update
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
 *                 description: The updated name of the user.
 *               password:
 *                 type: string
 *                 description: The updated password of the user.
 *             required:
 *               - name
 *               - password
 *     responses:
 *       200:
 *         description: Successfully updated user information.
 *         content:
 *           application/json:
 *             example:
 *               message: "User updated successfully."
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
 *         description: User not found. The provided ID does not match any existing user.
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */
signupRouter.patch("/users/:id",authMiddleware.isAuthenticated, signController.updateUser);

//deleting user
/**
 * @swagger
 * tags:
 *   - name: "Users"
 *     description: "Endpoints for managing user-related information"
 * 
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user based on their ID.
 *     tags:
 *       - "Users"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted the user.
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted successfully."
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
 *         description: User not found. The provided ID does not match any existing user.
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */
signupRouter.delete(
  "/users/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  signController.deleteUser
);

//user login

/**
 * @swagger
 * tags:
 *   - name: "Authentication"
 *     description: "Endpoints for user authentication"
 *
 * /login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login.
 *     tags:
 *       - "Authentication"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: User logged in successfully. Returns authentication token.
 *         content:
 *           application/json:
 *             example:
 *               token: "your_jwt_token_here"
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

signupRouter.post("/login", signController.loginUser);
//send email
/**
 * @swagger
 * tags:
 *   - name: "Subscription"
 *     description: "Endpoints for user subscription"
 * 
 * /subscribe:
 *   post:
 *     summary: Subscribe a user
 *     description: Subscribe a user by providing their names and email.
 *     tags:
 *       - "Subscription"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *                 description: The names of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *             required:
 *               - names
 *               - email
 *     responses:
 *       200:
 *         description: Successfully subscribed the user.
 *         content:
 *           application/json:
 *             example:
 *               message: "User subscribed successfully."
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

signupRouter.post("/subscribe", signController.subscribe);
//get all subscribers
/**
 * @swagger
 * tags:
 *   - name: "Subscription"
 *     description: "Endpoints for user subscription"
 * 
 * /subscribers:
 *   get:
 *     summary: Get all subscribers
 *     description: Retrieve information about all subscribers.
 *     tags:
 *       - "Subscription"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all subscribers.
 *         content:
 *           application/json:
 *             example:
 *               data: [
 *                 {
 *                   _id: "1234567890",
 *                   names: "John Doe",
 *                   email: "john.doe@example.com",
 *                 },
 *                 // other subscriber objects...
 *               ]
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

signupRouter.get(
  "/subscribers",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  signController.getAllsubscribers
);

module.exports = signupRouter;
