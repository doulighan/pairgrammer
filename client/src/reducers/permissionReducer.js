
export default function permissionReducer(state = false, action) {
    console.log(action.type, action.payload)
  switch(action.type) {
    case 'SET_PERMITTED':
      return action.payload     
    default:
      return state
  }
}