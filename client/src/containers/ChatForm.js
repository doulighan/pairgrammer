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
    const mess = this.state.message.replace(/^\s+/, '').replace(/\s+$/, '')
    if(mess === '') {
      this.setState({message: ''})
      return
    }
    const data = {
            room: this.props.roomid,      
            message: { 
              user: { name: this.props.user.username },
              body: this.state.message,
              color: this.props.color
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
      <form onSubmit={this.handleSubmit.bind(this)}>
          <input className='input-text' type="text" icon='reply' onChange={this.handleChange.bind(this)} placeholder="Type..."
            value={this.state.message}/>
      </form>
    )
  }
}

export default ChatForm








