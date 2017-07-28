import uuidV4  from 'uuidv4'

export default function usersReducer(state = [], action) {
  console.log(action, state)
  switch(action.type) {
    case 'CREATE_ROOM':
      for (var i = 0; i < state.length; i++) {
        if(state[i].id == action.payload.id)
          return state
      }
      return [...state, action.payload]      

    case 'LOAD_ROOMS':
      return action.payload

    default:
      return state


  }
}