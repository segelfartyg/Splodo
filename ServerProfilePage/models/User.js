const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
  })


  const User = mongoose.model("User", userSchema);

  module.exports = mongoose.model('User', userSchema)