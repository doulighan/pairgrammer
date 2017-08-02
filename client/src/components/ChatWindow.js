import React from 'react'
import ReactDOM from 'react-dom'
import MyComment from './MyComment'

const ChatWindow = ({messages}) => {
  const comments = (messages) ? messages.map(m => <MyComment message={m} />) : <div></div>
  return (  
    <div className='chat-scroll' id='chat-scroll'>
      {comments}
    </div>
  )
}

export default ChatWindow