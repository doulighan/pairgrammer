import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Homepage from './Homepage'
import uuidV4  from 'uuidv4'

import { setUser } from '../actions/users'
import { createRoom } from '../actions/rooms'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      roomName: ''
    }
  }

  submitRoom(e) {
    e.preventDefault()
    console.log(this.state.roomName)
    if(this.state.roomName === '' || this.state.roomName === ' ' ) return 
    const room = {
      name: this.state.roomName,
      id: uuidV4() 
    }
    this.props.createRoom(room)
    this.props.socket.emit('makeRoom', room)
    this.setState({roomName: '', proceed: true})
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    })
  }

  render () {
    return (
      <form>
          <input type="text" onChange={this.handleChange.bind(this)} placeholder="RoomName"
            value={this.state.roomName}/>
          <button onClick={this.submitRoom.bind(this)}>New Room</button>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createRoom: createRoom}, dispatch)
}

function mapStateToProps(state) {
  return {room: state.room}
}








