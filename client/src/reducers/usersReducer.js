import uuidV4  from 'uuidv4'

export default function usersReducer(state = {}, action) {
  console.log(action)
  switch(action.type) {
    case 'SET_USER':
    const user = {username: action.payload, id: uuidV4()}
    return user
    default:
      return state
  }
}