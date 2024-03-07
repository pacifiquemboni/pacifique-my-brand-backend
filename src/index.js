const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/connection.js");
const routes = require("./routes/blogroutes.js");
const signupRouter = require("./routes/usersignuproutes.js");
const messageRouter = require("./routes/messageroutes.js");
const portfolioRouter = require("./routes/portfolioroutes.js");
const multer = require("multer");
dotenv.config();
const app = express();
connectDB;

app.use("/api", routes);
app.use("/api", signupRouter);
app.use("/api", messageRouter);
app.use("/api", portfolioRouter);
app.get("/", (req, res) => {
  res.status(200).send("Welcome to my API");
});

app.get("*", (req, res) => {
  res.status(404).send("Page is not found");
});

const port = process.env.PORT || 5000;
const hostname = "127.0.0.1";
module.exports = app.listen(port, () => {
  console.log(`Server has started! on http://${hostname}:${port}`);
});



// module.exports = function(port) {
//   return app.listen(port);
// };
