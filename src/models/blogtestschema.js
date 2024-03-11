const mongoose = require("mongoose")

// const author = 'Pacifique Mbonimana';
const testblogSchema = mongoose.Schema({
  title:{
    type: String
  },
  author:{
    type: String
  },
  intro:{
    type: String
  },
  body:{
    type: String
  },
  comments:[
    {
      names:String,
      timeadded:{
        type: Date
      },
      comment:String
    },
  ],
})



module.exports = mongoose.model("testBlog",testblogSchema)