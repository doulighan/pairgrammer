export function createRoom(name){
  return {type: 'CREATE_ROOM', payload: name}
}

export function loadRooms(rooms) {
  return {type: 'LOAD_ROOMS', payload: rooms}
}
