import React from 'react'

const TypeMessage = ({user}) => {
  console.log(user.color)
  return (
    <div className='typingmessage' style={{'backgroundColor':`${user.color}`}}>
      <h2>{user.name} is currently typing...</h2>
    </div>
  )
}

export default TypeMessage