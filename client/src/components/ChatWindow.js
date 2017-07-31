import React from 'react'
import ReactDOM from 'react-dom'
import MyComment from './MyComment'

const ChatWindow = ({messages}) => {
  const comments = messages.map(m => <MyComment message={m} />)
  var scroll = document.getElementById("chat-scroll")
  if(scroll) {
    console.log(scroll.scrollTop)
  }
  return (  
    <div className='chat-scroll' id='chat-scroll'>
      {comments}
    </div>
  )
}

export default ChatWindow