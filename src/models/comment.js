const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
  blogid:String,
  names: String,
  comment:String,
  dateadded:{
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Comments", commentSchema);