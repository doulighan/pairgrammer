import uuidV4  from 'uuidv4'

export default function usersReducer(state = {}, action) {
  console.log(action)
  switch(action.type) {
    case 'SET_USER':
      return {username: action.payload.name, id: action.payload.socket}
    default:
      return state
  }
}