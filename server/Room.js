class Room {
  constructor(name, user, data) {
    this.code = ""
    this.name = name
    this.users = []
    this.mod = user
    this.users.push(user)
  }

  merge(code) {
    this.code = code
  }

  join(socket) {
    socket.join(this.name)
  }

  broadcast(socket, data) {
    socket.broadcast.to(this.name).emit(data)
  }
}