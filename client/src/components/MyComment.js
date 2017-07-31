import React from 'react'
import ReactDOM from 'react-dom'

const MyComment = ({message}) => {
  return (
    <div id='comment'>
      <h5>{message.user.name}</h5>
      <span>Today at {message.time}</span>
      <p>{message.body}</p>
    </div>
  )
}

export default MyComment
