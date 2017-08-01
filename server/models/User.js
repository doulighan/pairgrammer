const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  _id: String,
  socketID: String
})

module.exports = mongoose.model('User', userSchema, 'user')
