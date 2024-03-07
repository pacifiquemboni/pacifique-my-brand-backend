const mongoose = require("mongoose")

const subSchema = mongoose.Schema({
  names:String,
  email:String,
  timeofsubscribing: Date
})

module.exports = mongoose.model("Subscribers", subSchema)