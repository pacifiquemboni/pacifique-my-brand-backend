const mongoose = require("mongoose");
const date = require('date-and-time') 

const now  =  new Date();
// const formatteddate =
const commentSchema = mongoose.Schema({
  blogid: String,
  names: String,
  comment: String,
  dateadded: {
    type: Date,
    default: Date.now
  }
});

// Define a virtual property to format the date as "dd/mm/yy"


module.exports = mongoose.model("Comment", commentSchema);