const mongoose = require ("mongoose");
const dotenv = require("dotenv")

dotenv.config();
//local DB 
//mongodb://localhost:27017/nodedb
const connectDB = mongoose 
          .connect(process.env.MONGO_URI)
          .then((result) => console.log("Database Connected Successfully"))
          .catch((err) => console.log('error happened'+err))


module.exports = connectDB;