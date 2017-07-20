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
    users[0].cursor = data.cursor
    for (let i = 0; i < users.length; i++) {
      for(let j = 0; j < users.length; j++) {
        if(users[i].cursor.row === users[j].cursor.row && i !== j) {
          return
        }
      }
    }
    code = data.code
    console.log('1: ', 'user1: ', data.cursor, 'user2: ', users[1].cursor)

    io.sockets.emit('update', code)
  })

  if(users.length > 1){
    socket.on(users[1].id, function(data) {
      users[1].cursor = data.cursor
      for (let i = 0; i < users.length; i++) {
       for(let j = 0; j < users.length; j++) {
         if(users[i].cursor.row === users[j].cursor.row && i !== j) {
           return
         }
       }
     }
     console.log('2: ', 'user1: ', users[0].cursor, 'user2: ', data.cursor)
     code = data.code
     io.sockets.emit('update', code)
   })
  }
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})



