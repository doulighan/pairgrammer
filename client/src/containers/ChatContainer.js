import React from 'react'
import ReactDOM from 'react-dom'
import ChatWindow from '../components/ChatWindow'
import ChatForm from './ChatForm'
import {Segment, Grid, Menu, Sidebar} from 'semantic-ui-react'
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
    return (
      <div>
        <ChatWindow messages={this.state.messages} />
        <ChatForm socket={this.props.socket} roomid={this.props.room._id} user={this.props.user}/>
      </div>
    )
  }
}

export default ChatContainer