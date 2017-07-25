import React from 'react'
import ReactDOM from 'react-dom'
import { Comment } from 'semantic-ui-react'

const MyComment = ({message}) => {
  console.log(message)
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author as='a'>{message.user.name}</Comment.Author>
        <Comment.Metadata>
          <span>Today at {message.time}</span>
        </Comment.Metadata>
        <Comment.Text>{message.body}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default MyComment
