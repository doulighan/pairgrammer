import uuidV4  from 'uuidv4'

export default function usersReducer(state = {}, action) {
  console.log(action)
  switch(action.type) {
    case 'CREATE_ROOM':
      return {name: action.payload, id: uuidV4()}
    default:
      return state
  }
}