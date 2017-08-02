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

  hasRoomAndPermitted() {
    return (this.props.room._id && this.props.permitted)
  }

  chat() {
    if(this.hasRoomAndPermitted && this.props.room) {
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
    console.log(this.props.color)
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

