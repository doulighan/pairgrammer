import React from 'react'
import ReactDOM from 'react-dom'

const RoomInfo = ({room}, {user}) => {
  var users = ''
   if(room.users){
      users = room.users.map(p => {
        if(p){
          return <li key={p._id}>{p.username}</li>
        }
      })
    }
  return (
    <div className='room-info-text'>
      <h4>{room.name}</h4>
      <ul>
        {users}
      </ul>
    </div>
  )

}

export default RoomInfo