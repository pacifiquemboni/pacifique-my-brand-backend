const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./database/connection.js");
const routes = require("./routes/blogroutes.js");
const signupRouter = require("./routes/usersignuproutes.js");
const messageRouter = require("./routes/messageroutes.js");
const portfolioRouter = require("./routes/portfolioroutes.js");
const uploadRoute = require('./controllers/routeuploads.js')
const path = require('path');
const multer = require("multer");
// const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpecs = require('./swagger.js');
const swaggerUi = require("swagger-ui-express");
const app = express();
app.use(cors());
dotenv.config();
connectDB;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.use("/", routes);//for blogs
app.use("/", signupRouter);
app.use("/", messageRouter);
app.use("/", portfolioRouter);
app.use('/api/upload', uploadRoute)
// Serve static files from the 'uploads' directory
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
