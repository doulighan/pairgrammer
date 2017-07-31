var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var ObjectId = require('mongoose').Types.ObjectId;

const Room = require('./models/Room.js')
const User = require('./models/User.js')
const Message = require('./models/Message.js')


io.on('connection', (socket) => {
  console.log('connected: ' + socket.id)

  socket.on('addPerson', (data) => {
    addPerson(data, socket)
  })

  socket.on('disconnect', () => {
    console.log('usersocket left: ', socket.id)
  })

  socket.on('makeRoom', (data) => {
    console.log(data)
    makeRoom(data, socket)
   })

  socket.on('joinRoom', (id) => {
    joinRoom(id, socket)
  })

  // socket.on('setColor', (data) => {
  //   setColor(data.roomid, data.color, socket)
  // })

  socket.on('leaveRoom', (roomid) => {
    leaveRoom(roomid, socket)
  })

  socket.on('codeUpdate', (data) => {
    codeUpdate(data, socket)
    socket.broadcast.to(data.id).emit('blockInput', data.user)
  })

  socket.on('requestRooms', (data) => {
    sendRooms()
  })

  socket.on('chat', (data) => {
    chat(data, socket)
  })

})

mongoose.connect('mongodb://localhost/db')

http.listen(3000, function(){
  console.log('listening on *:3000')
})

//////////////////////////////////////////////////////////////////
function chat(data, socket) {
  console.log(data)
  var message = new Message({user: {name: data.message.user.name, socketID: socket.id}, 
    body: data.message.body,
    color: data.message.color
  })
  Room.findOne({_id: data.room}, (err, room) => {
    message.markModified('message')
    room.messages.push(message)
    room.save()
  })
  io.sockets.to(data.room).emit('chat', message)
}

function addPerson(data, socket) {
  var user = new User({username: data.username, _id: data.id, socketID: socket.id})
  user.save((err) => {
    if(err) return (err) => console.log(error)
    console.log('user saved!')
  })
}

function makeRoom(data, socket) {
  var room = new Room({name: data.name, _id: data.id, code: '', users: []})
  room.save((err) => {
    if(err) return handleError(err)
    console.log('room saved!')
    sendRooms()
  })
}

function sendRooms() {
  Room.find({}, (err, res) => {
    io.sockets.emit('requestRooms', res)
  })
}

function addUserToRoom(user, roomid) {
  Room.findOne({_id: roomid}, (err, room) => {
    if(user == null || room == null) {return 'null room/user'}
    user.markModified('user')
    room.users.push(user)
    room.save()
    sendRoom(room)
  })
}

function removeUserFromRoom(user, roomid) {
  Room.findOne({_id: roomid}, (err, room) => {
    user.markModified('user')
    room.users.pull(user)
    room.save()
    sendRoom(room)
  })
}

function sendRoom(room) {
  io.sockets.in(room._id).emit('sendRoom', room)
}

function joinRoom(id, socket) {
  console.log('joined room')
  User.findOne({socketID: socket.id}, (err, res) => {
    addUserToRoom(res, id)
  })
  socket.join(id)
}

function leaveRoom(roomid, socket) {
  console.log(socket.id, 'left room')
  User.findOne({socketID: socket.id}, (err, user) => {
    removeUserFromRoom(user, roomid)
  })
  socket.leave(roomid)
}

function codeUpdate(data, socket) {
  console.log('data in:', data)
  Room.findOne({_id: data.id}, (err, room) => {
    room.code = data.code
    room.save()
    io.sockets.to(room._id).emit('codeUpdate', room.code)
  })
}

function setColor(roomid, color, socket) {
  User.findOne({socketID: socket.id}, (err, user) => {
    setColorRoom(roomid, user, color)
  })
}

function setColorRoom(roomid, user, color) {
    Room.findOne({_id: roomid}, (err, room) => {
      if(user == null || room == null) {return 'null room/user'}
      user.markModified('user')
      room.users.push(user)
      room.save()
      sendRoom(room)
    })
  }



