import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import roomsReducer from './roomsReducer'
import colorsReducer from './colorsReducer'
import permissionsReducer from './permissionReducer'

export default combineReducers({
  user: usersReducer,
  room: roomsReducer,
  color: colorsReducer,
  permitted: permissionsReducer
})