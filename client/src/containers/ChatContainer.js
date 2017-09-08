import React from 'react'
import ReactDOM from 'react-dom'
import ChatWindow from '../components/ChatWindow'
import ChatForm from './ChatForm'
import {connect} from 'react-redux'

class ChatContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  compare(a,b) {
    if(a.time > b.time) 
      return 1
    if(a.time < b.time) 
      return -1
    return 0
  }

  componentWillMount() {
    this.props.socket.on('chat', (mes) => {
      const messages = [...this.state.messages, mes].sort(this.compare)
      this.setState({
        messages: messages
      })
    })
  }

  chat() {
    if(this.props.room && this.props.permitted) {
      return (
        <div>
          <ChatWindow messages={this.state.messages.reverse()} />
          <ChatForm roomid={this.props.room._id} user={this.props.user} socket={this.props.socket} color={this.props.color} />
        </div>
      )
    } else {
      return (
        <div>
          <ChatWindow messages={null} />
          <div className='chat-error'>
            <h3>Join a room to chat!</h3>
          </div>
        </div>
      )
    }   
  }

  render () {
    const chat = this.chat()
    return (
      <div>
        {chat}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
    user: state.user,
    color: state.color,
    permitted: state.permitted
  }
}

export default connect(mapStateToProps, null)(ChatContainer)

