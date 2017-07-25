import React from 'react'
import ReactDOM from 'react-dom'
import MyComment from './MyComment'
import {Comment, Header, Segment} from 'semantic-ui-react'

const ChatWindow = ({messages}) => {
  const comments = messages.map(m => <MyComment message={m} />)
  return (  
    <Segment>
      <Comment.Group>
        <Header as='h4' dividing>Chat</Header>
        {comments}
      </Comment.Group>
    </Segment>
  )
}

export default ChatWindow