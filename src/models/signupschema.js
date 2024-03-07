const mongoose = require("mongoose")


const signupSchema = mongoose.Schema({
  names:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  confpass:{
    type: String,
    required: true
  },
  role:{
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now()
},
updatedAt: {
    type: Date,
    default: Date.now()
},
})

module.exports = mongoose.model("User",signupSchema)