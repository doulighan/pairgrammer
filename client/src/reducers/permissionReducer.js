
export default function permissionReducer(state = false, action) {
  switch(action.type) {
    case 'SET_PERMITTED':
      return action.payload     
    default:
      return state
  }
}