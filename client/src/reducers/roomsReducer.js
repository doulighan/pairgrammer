import uuidV4  from 'uuidv4'

export default function roomsReducer(state = [], action) {
  console.log(action, state)
  switch(action.type) {
    case 'CREATE_ROOM':
      return [...state, action.payload]      

    case 'SET_ROOM':
      console.log(action)
      return action.payload

    default:
      return state


  }
}