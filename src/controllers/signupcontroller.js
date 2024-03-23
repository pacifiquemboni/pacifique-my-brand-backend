const JWT = require("../helper/jwt.js");
const User = require("../models/signupschema.js");
const Subs = require("../models/subscribeschema.js");
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class userSignupController {
  static async getAllSignUpUsers(req, res) {
    // const{names,email,password,confpass,role} = req.body;
    const signedUser = await User.find();
    if (signedUser.length === 0) {
      return res.status(200).json({
        message: "There is no Users registered",
      });
    }
    return res.status(200).json({
      status: "Registerd Users",
      data: signedUser,
    });
  }
  //register user
  //register user
  static async registerUser(req, res) {
    try {
      const { names, email, password, confpass, role } = req.body;
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(400).json({
          message: "Email is already taken",
        });
      }

      let errors = "";
      if (!String(names).trim()) {
        errors = "Names are required";
      }
      if (
        !/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(
          String(email)
        )
      ) {
        errors = "Email is not valid.";
      }
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(String(password))) {
        errors =
          "Enter a valid password it contains atleast one capital letter, one small letter, one special char and one number";
      }
      if (password !== confpass) {
        errors = "Password doesnt match!";
      }
      if (errors) {
        return res.status(400).json({
          message: errors,
        });
      }
      // const salt = bcrypt.genSaltSync(12)
      const hashPassword = bcrypt.hashSync(password, 10);

      const user = await User.create({
        names,
        email,
        password: hashPassword,
        confpass: hashPassword,
        role,
      });
      return res.status(200).json({
        status: "successfull registered",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  //get single user
  static async getOneUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.id });
      if (singleUser) {
        return res.status(200).json({
          status: "success",
          message: " userID exist",
          data: singleUser,
        });
      }
      return res.status(200).json({
        message: "you deleted that userID ",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  //update user
  /**
   * Update information about a user based on their ID.
   * @function
   * @async
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - JSON response
   */
  static async updateUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.id });
      const { names, email, password, confpass, role, updatedAt } = req.body;
      if (names) {
        singleUser.names = names;
      }
      if (email) {
        singleUser.email = email;
      }

      if (password) {
        const hashPassword = bcrypt.hashSync(password, 10);
        singleUser.password = hashPassword;
      }

      if (updatedAt) {
        singleUser.updatedAt = Date.now();
      }

      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        singleUser,
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        data: updateUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "userId not found",
      });
    }
  }
  //deleting a user
  /**
   * Delete a user based on their ID.
   * @function
   * @async
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - JSON response
   */
  static async deleteUser(req, res) {
    try {
      await User.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        status: "User deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "delete is not successfull!",
      });
    }
  }
  //login a user
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const userExist = await User.findOne({ email });
      console.log(userExist); // Log the user object
      if (!userExist) {
        return res.status(404).json({
          message: "Account does not exist",
        });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Incorrect credentials",
        });
      }
      // Log the userExist and token
    console.log("User Exist:", userExist);
      const token = JWT.generateJwt({
        userId: userExist._id,
        role: userExist.role,
        name: userExist.names,
      });
      console.log("Generated Token:", token);
      return res.status(200).json({
        token: token,
        role: userExist.role,
        
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  //subscribe
  /**
   * Subscribe a user by providing their names and email.
   * @function
   * @async
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - JSON response
   */
  static async subscribe(req, res) {
    try {
      const { names, email } = req.body;
      const subscriberExist = await Subs.findOne({ email });
      if (subscriberExist) {
        return res.status(404).json({
          message: "Account alredy subscribed",
        });
      }
      const sub = await Subs.create({
        names,
        email,
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "pacifiquemboni@gmail.com",
          pass: process.env.EMAIL_PASS,
        },
      });
      let msg =
            "Thank you for subscribing! 🌟 We're thrilled to have you on board. Stay tuned for exciting updates and exclusive content. Your support means the world to us! 🚀✨";
          let body = msg + "Thanks Again: " + names;
      const mailOptions = {
        from: "pacifiquemboni@gmail.com",
        to: email,
        subject: "Stay Connected: ATC's Monthly Newsletter",
        text:body
      };

      const info = await transporter.sendMail(mailOptions);

      console.log("Email sent: " + info.response);

      return res.status(200).json({
        message: "Subscription email sent successfully",
      });
    } catch (error) {
      console.error("Error sending email:", error);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  /**
   * Retrieve information about all subscribers.
   * @function
   * @async
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - JSON response
   */
  static async getAllsubscribers(req, res) {
    // const{names,email,password,confpass,role} = req.body;
    const subscribeUser = await Subs.find();
    if (subscribeUser.length === 0) {
      return res.status(200).json({
        message: "There is no subscribers",
      });
    }
    return res.status(200).json({
      status: "subscribed Users",
      data: subscribeUser,
    });
  }
}

module.exports = userSignupController;

// static async getAllSignUpUsers(req, res) {
//   // const{names,email,password,confpass,role} = req.body;
//   const signedUser = await User.find();
//   if (signedUser.length === 0) {
//     return res.status(200).json({
//       status: "success",
//       message: "There is no Users registered",
//     });
//   }
//   return res.status(200).json({
//     status: "Registerd Users",
//     data: signedUser,
//   });
// }
