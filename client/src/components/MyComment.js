import React from 'react'
import ReactDOM from 'react-dom'

const MyComment = ({message}) => {
  return (
    <div className='comment'>
      <h5 style={{'color':`${message.color}`}}>{message.user.name}</h5>
      <p style={{'color':'#666'}}>Today at {message.time}</p>
      <p style={{'color':'#fff'}}>{message.body}</p>
    </div>
  )
}

export default MyComment
