import uuidV4  from 'uuidv4'

export default function roomsReducer(state = [], action) {
  switch(action.type) {
    case 'CREATE_ROOM':
      return [...state, action.payload]      

    case 'SET_ROOM':
      return action.payload

    default:
      return state
  }
}