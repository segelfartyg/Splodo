const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    splodoName: String,
    createdAt:{
        type: Date,
        default: Date.now
    },
    role: String
  })

  var User = mongoose.model('User', userSchema);

  module.exports = {
    User: User
  }