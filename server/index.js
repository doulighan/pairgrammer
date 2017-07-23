var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var Room = require('./room.js')
var Person = require('./person.js')

var people = {}
var rooms = {}
var sockets = []
var chatHistory = {}


// people[socket.id] = {"name" : name, "owns" : ownerRoomID, "inroom": inRoomID, "device": device};
rooms[1] = new Room('test', 1)
rooms['abc'] = new Room('another test', 'abc')

io.on('connection', function(socket) {
  console.log('connected: ' + socket.id)

  socket.on('addPerson', function(data) {
    var person = new Person(data.username, data.id)
    people[socket.id] = person
    console.log(people)
  })

  socket.on('disconnect', function() {
    people[socket.id] = null
  })

  socket.on('makeRoom', function(data) {
    console.log('made room')
    if(!rooms[data.id]) {
      var room = new Room(data.name, data.id)
      room.addPerson(people[socket.id])
      rooms[data.id] = room
    }
   })

  socket.on('joinRoom', function(id) {
    console.log('joined room')
    var room = rooms[id]
    room.addPerson(people[socket.id])
    socket.join(room.id)
    socket.emit('sendRoom', room)
  })

  socket.on('leaveRoom', function(data) {
    console.log(socket.id, 'left room')
    var room = rooms[data]
    room.removePerson(people[socket.id])
    socket.leave(data)
  })

  socket.on('codeUpdate', function(data) {
     console.log('data in:', data)
     socket.broadcast.to(data.room).emit('codeUpdate',   
  data.code)})

  socket.on('requestRooms', function(data) {
    socket.emit('requestRooms', rooms)
  })
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})

var getRoom = (id, rooms) => {
  return rooms.find( r => id === r.id)
}



