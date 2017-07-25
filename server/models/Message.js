const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  user: {name: String, socketID: String},
  body: String,
  time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', messageSchema, 'message')
