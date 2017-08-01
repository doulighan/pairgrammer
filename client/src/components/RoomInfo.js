import React from 'react'
import Nametag from './Nametag'

const RoomInfo = ({room}, {user}) => {
  var users = ''
   if(room.users){
      users = room.users.map(p => {
        if(p){
          return <Nametag key={p._id + room._id} user={p} />
        }
      })
    }

  return (
    <div>
      <div className='room-info-header'>
       <h2>{room.name}  ({room.mode})</h2>
      </div>
      <div className='room-info-text'>
          {users}
      </div>
    </div>
  )

}

export default RoomInfo