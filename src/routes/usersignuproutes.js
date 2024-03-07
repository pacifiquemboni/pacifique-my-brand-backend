const express = require("express")
// const signupSchema = require('../modal/signupschema.js')
const authMiddleware = require("../middleware/authmiddleware.js")
const signupRouter = express.Router()
const signController = require("../controllers/signupcontroller.js")

signupRouter.use(express.json());

//get all users
// authMiddleware.isAuthenticated,authMiddleware.checkRole,
signupRouter.get("/users", signController.getAllSignUpUsers)
//register a user
signupRouter.post("/user", signController.registerUser)

// get single user
signupRouter.get("/users/:id",authMiddleware.isAuthenticated,authMiddleware.checkRole,signController.getOneUser)

//update user
signupRouter.patch("/users/:id", signController.updateUser)

//deleting user
signupRouter.delete("/users/:id",authMiddleware.isAuthenticated,authMiddleware.checkRole, signController.deleteUser)

//user login
signupRouter.post("/login", signController.loginUser)
//send email
signupRouter.post("/sub", signController.subscribe)
//get all subscribers
signupRouter.get("/subscribers",authMiddleware.isAuthenticated,authMiddleware.checkRole, signController.getAllsubscribers)

module.exports = signupRouter;