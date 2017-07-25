import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

class ChatForm extends React.Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = {
            room: this.props.roomid,
            message: { 
              user: { name: this.props.user.username },
              body: this.state.message
            }
          }
    this.props.socket.emit('chat', data)
    this.setState({message: ''})
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
          <Input type="text" onChange={this.handleChange.bind(this)} placeholder="Type..."
            value={this.state.message}/>
          <Button type='submit'/>
      </Form>
    )
  }
}

export default ChatForm








