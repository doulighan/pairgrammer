import React from 'react';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import Editor from './Editor'


class Room extends React.Component {  
  constructor() {
    super()
    this.state = {
      room: {},
    }
  }
  
  componentDidMount() {
    this.props.socket.emit('joinRoom', this.props.match.params.roomid )
    this.props.socket.on('sendRoom', (data) => this.setRoom(data))
  }

  setRoom(data) {
    this.setState({
      room: {
        id: data.id,
        name: data.name,
        code: data.code,
      },
      ready: true
    })
  }

  componentWillUnmount() {
    this.props.socket.emit('leaveRoom', this.state.room.id)
  }

  render() {
    var editor = (this.state.ready) ? <div><Editor socket={this.props.socket} roomid={this.props.match.params.room} />  <h1>{this.state.room.name}</h1></div> : <p>loading</p>
    return (
      <div>
        {editor}
      </div>
    )
  }
}



export default connect(null, null)(Room)