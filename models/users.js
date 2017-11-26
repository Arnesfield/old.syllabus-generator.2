const mongoose = require('mongoose')

// users schema
const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('User', usersSchema)
