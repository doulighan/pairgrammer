import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import roomsReducer from './roomsReducer'
import colorsReducer from './colorsReducer'

export default combineReducers({
  user: usersReducer,
  room: roomsReducer,
  color: colorsReducer
})