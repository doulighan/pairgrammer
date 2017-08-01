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
  }

  hasRoomAndPermitted() {
    return (this.props.room.length > 0 && this.props.permitted)
  }

  chat() {
    if(this.hasRoomAndPermitted) {
      return (
        <div>
          <ChatWindow messages={this.state.messages.reverse()} />
          <ChatForm roomid={this.props.room._id} user={this.props.user} socket={this.props.socket} color={this.props.color} />
        </div>
      )
    } else {
      return (<div>Not currently in room!</div>)
    }   
  }

  render () {
    console.log(this.props.room, this.props.permitted)
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

