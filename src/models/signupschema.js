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

})

const User = mongoose.model('User', signupSchema)

module.exports = User;