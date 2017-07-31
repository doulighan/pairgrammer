import React from 'react'
import ReactDOM from 'react-dom'
import ChatWindow from '../components/ChatWindow'
import ChatForm from './ChatForm'
import {connect} from 'react-redux'
import Delay from 'react-delay'

class ChatContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [{user: {name: 'Pairgrammer', socketID: 1}, body: 'Welcome to chat!', time: 0}]
    }
  }

  componentWillMount() {
    this.props.socket.on('chat', (mes) => this.setState({messages: [...this.state.messages, mes]}))
    this.props.socket.on('chat', (mes) => console.log(mes))
  }

  render () {
    const chatForm = (this.props.room) ?  <ChatForm roomid={this.props.room._id} user={this.props.user} socket={this.props.socket} /> : <div>not in room</div>
    return (
      <div>
        <ChatWindow messages={this.state.messages} />
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
  }
}

export default connect(mapStateToProps, null)(ChatContainer)

