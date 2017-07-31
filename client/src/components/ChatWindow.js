import React from 'react'
import ReactDOM from 'react-dom'
import MyComment from './MyComment'

const ChatWindow = ({messages}) => {
  const comments = messages.map(m => <MyComment message={m} />)
  return (  
    <div id='chat-window'>
      {comments}
    </div>
  )
}

export default ChatWindow