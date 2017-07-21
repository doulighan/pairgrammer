import React from 'react';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import Editor from './Editor'


class Room extends React.Component {  
  constructor(props) {
    super(props)
    this.state = {
      roomid: props.match.params.roomid,
      room: {}
    }
  }
  
  componentDidMount() {
    this.props.socket.emit('joinRoom', this.state.roomid )
    this.props.socket.on('sendRoom', (room) => this.setState({room: room}))
  }

  componentWillUnmount() {
    this.props.socket.emit('leaveRoom', this.state.roomid)
  }

  render() {
    var editor = (this.state.room) ? <Editor socket={this.props.socket} roomid={this.state.roomid} /> : <p>loading</p>
    return (
      <div>
        <h1>{this.state.room.name}</h1>
        {editor}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {rooms: state.rooms}
}


export default connect(mapStateToProps, null)(Room)