export function createRoom(name){
  return {type: 'CREATE_ROOM', payload: name}
}
