import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import roomsReducer from './roomsReducer'

export default combineReducers({
  user: usersReducer,
  room: roomsReducer
})