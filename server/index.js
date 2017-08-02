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
    User.findOne({socketID: socket.id}, (err, user) => {
      if(err || user == null) return handleError(err, 'REMOVING_USER')
      Room.find({}, (err, rooms) => {
        if(err) return handleError(err, 'DISCONNECT')
        rooms.forEach((room, idx) => {
          removeUserFromRoom(user, room._id)
        })
      })
    })   
  })

  socket.on('makeRoom', (data) => {
    console.log(data)
    makeRoom(data, socket)
   })

  socket.on('joinRoom', (id) => {
    joinRoom(id, socket)
  })

  socket.on('setColor', (data) => {
    setColor(data.roomid, data.color, socket)
  })

  socket.on('leaveRoom', (roomid) => {
    console.log('leaveRoom')
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
    if (err) return handleError(err, 'CHAT:')
    message.markModified('message')
    room.messages.push(message)
    room.save()
  })
  io.sockets.to(data.room).emit('chat', message)
}

function addPerson(data, socket) {
  var user = new User({username: data.username, _id: data.id, socketID: socket.id})
  user.save((err) => {
    if (err) return handleError(err, 'ADD_PERSON:')
    console.log('user saved!')
  })
}

function makeRoom(data, socket) {
  var room = new Room({name: data.name, _id: data.id, code: '', password: data.password, mode: data.mode, users: []})
  room.save((err) => {
    if(err) return handleError(err, 'MAKE_ROOM')
    console.log('room saved!')
    sendRooms()
  })
}

function sendRooms() {
  Room.find({}, (err, res) => {
    if(err) return handleError(err, 'SEND_ROOM')
    io.sockets.emit('requestRooms', res)
  })
}

function addUserToRoom(user, roomid) {
  Room.findOne({_id: roomid}, (err, room) => {
    if(err) return handleError(err, 'ADD_USER_TO_ROOM')
    if(user == null || room == null) {return 'null room/user'}
    user.markModified('user')
    room.users.push(user)
    room.save()
    sendRoom(room)
  })
}

function removeUserFromRoom(user, roomid) {
  Room.findOne({_id: roomid}, (err, room) => {
    if(err || !user) return handleError(err, 'REMOVE_USER_FROM_ROOM')
    user.markModified('user')
    room.users.pull(user)
    room.save()
    sendRoom(room)
  })
}

function sendRoom(room) {
  io.sockets.in(room._id).emit('sendRoom', room)
}

function findAndSendRoom(roomid) {
  Room.findOne({_id: roomid}, (err, room) => {
    if(err) return handleError(err, 'FIND_AND_SEND_ROOM')
    sendRoom(room)
 })
}

function joinRoom(id, socket) {
  console.log('joined room')
  User.findOne({socketID: socket.id}, (err, res) => {
    if(err) return handleError(err, 'JOIN_ROOM')
    addUserToRoom(res, id)
  })
  socket.join(id)
}

function leaveRoom(roomid, socket) {
  socket.leave(roomid)
  console.log(socket.id, 'left room')
  User.findOne({socketID: socket.id}, (err, user) => {
    if(err) return handleError(err, 'LEAVE_ROOM')
    removeUserFromRoom(user, roomid)
  })
}

function codeUpdate(data, socket) {
  console.log('data in:', data)
  Room.findOne({_id: data.id}, (err, room) => {
    if(err) return handleError(err, 'CODE_UPDATE')
    room.code = data.code
    room.save()
    io.sockets.to(room._id).emit('codeUpdate', room.code)
  })
}

function setColor(roomid, color, socket) {
  console.log(roomid, color, socket.id)
  Room.findOneAndUpdate(
    {'_id': roomid, 'users.socketID': socket.id}, 
    {'$set': { 'users.$.color': color }}, 
    {new: true},
    function(err, room) {
      console.log('UPDATE ROOM:', room)
      if(err) return handleError(err, 'SET_COLOR')
      findAndSendRoom(roomid)
  })
}



function handleError(err) {
  console.log('Error!:', err)
}



