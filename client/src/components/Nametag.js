import React from 'react'
import ReactDOM from 'react-dom'

const Nametag = ({user}) => {
  return (
    <div style={{'background-color':`${user.color}`}} className='nametag'>
      <p style={{'color':'#000'}}>{user.username}</p>
    </div>
  )
}

export default Nametag