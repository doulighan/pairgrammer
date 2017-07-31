export function createRoom(name){
  return {type: 'CREATE_ROOM', payload: name}
}

export function setRoom(room) {
  return {type: 'SET_ROOM', payload: room}
}
