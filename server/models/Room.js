const mongoose = require('mongoose')
const User = require('./User.js')
const Message = require('./Message.js')

const Schema = mongoose.Schema

const roomSchema = new Schema({
  name: String,
  _id: String,
  code: String, 
  users: [User.schema],
  messages: [Message.schema]
})

module.exports = mongoose.model('Room', roomSchema, 'room')
