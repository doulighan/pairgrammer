import uuid  from 'uuidv4'

export default function usersReducer(state = {}, action) {
  switch(action.type) {
    case 'SET_USER':
      const user = {username: action.payload, id: uuid()}
      return user
    default:
      return state
  }
}