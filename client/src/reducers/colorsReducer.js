
export default function colorsReducer(state = '', action) {
  console.log(action, state)
  switch(action.type) {
    case 'SET_COLOR':
      if(state !== '') return state
      return action.payload

    default:
      return state
  }
}