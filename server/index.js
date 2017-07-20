var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var code = ""
var users = []
var rooms = []


io.on('connection', function(socket) {
  users.push({id: socket.id, cursor: {row:0, column: 0}})
  console.log('connected: ' + socket.id)
  console.log('numUsers: ' + users.length)

  socket.on('disconnect', function() {
    console.log('Got disconnect!')
  })

  socket.on(users[0].id, function(data) {
    io.sockets.emit('update', data
   })
  }
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})



