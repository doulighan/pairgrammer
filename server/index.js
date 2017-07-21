var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var code = ""
var users = []
var rooms = [{name: 'test', id: '1'}]


io.on('connection', function(socket) {
  users.push(socket)
  console.log('connected: ' + socket.id)
  console.log('numUsers: ' + users.length)

  socket.on('disconnect', function() {
    var i = users.indexOf(socket)
    users.splice(i, 1)
  })

  socket.on('makeRoom', function(data) {
    rooms.indexOf(data) === -1 ? rooms.push(data) : console.log('room alreadt exists')
   })

  socket.on('joinRoom', function(id) {
    var room = rooms.find(function(r) {
      return r.id == id
    })
    socket.join(id)
    socket.emit('sendRoom', room)
  })

  socket.on('leaveRoom', function(data) {
    console.log(socket.id, 'left room')
    socket.leave(data)
  })

  socket.on('codeUpdate', function(data) {
    console.log('incomingdata: ', data)
     socket.broadcast.to(data.room).emit('codeUpdate',   
  data.code)})

  socket.on('requestRooms', function(data) {
    console.log('requeted rooms:', rooms)
    socket.emit('requestRooms', rooms)
  })
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})



