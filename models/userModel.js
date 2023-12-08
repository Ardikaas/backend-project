const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the username"]
    },
    password : {
      type: String,
      require: [true]
    },
    email: {
      type: String,
      required: [true],
    },
  }
)

const User = mongoose.model('User', userSchema);

module.exports = User