import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

const TypeMessage = ({username}) => (
  <Message icon>
    <Icon name='spinner notched' loading />
    <Message.Content>
      <Message.Header>One second</Message.Header>
      {username} is currently typing...
    </Message.Content>
  </Message>
)

export default TypeMessage