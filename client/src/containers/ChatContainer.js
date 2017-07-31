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

  componentWillMount() {
    this.props.socket.on('chat', (mes) => this.setState({messages: [...this.state.messages, mes]}))
    this.props.socket.on('chat', (mes) => console.log(mes))
  }

  render () {
    const chatForm = (this.props.room) ?  <ChatForm roomid={this.props.room._id} user={this.props.user} socket={this.props.socket} color={this.props.color} /> : <div>not in room</div>
    return (
      <div>
        <ChatWindow messages={this.state.messages.reverse()} />
        {chatForm}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    room: state.room,
    user: state.user,
    color: state.color
  }
}

export default connect(mapStateToProps, null)(ChatContainer)

