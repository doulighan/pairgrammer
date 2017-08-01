import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Homepage from './Homepage'
import uuid  from 'uuidv4'

import { setUser } from '../actions/users'
import { createRoom } from '../actions/rooms'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      roomName: '',
      password: '',
      mode: '',
      proceed: false
    }
  }

  submitRoom(e) {
    e.preventDefault()
    if(this.state.roomName === '' || this.state.roomName === ' ' ) 
      return window.alert('Please enter a name!')

    const room = {
      name: this.state.roomName,
      id: uuid(),
      mode: this.state.mode, 
      code: '',
      password: this.state.password
    }
    this.props.createRoom(room)
    this.props.socket.emit('makeRoom', room)
    this.setState({roomName: '', password: '', mode: '', proceed: true})
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleModeChange(e) {
    console.log('modechange')
  }


  render () {
    return (
      <div className='room-form'>
        <form class="form-style-9">
          <input onChange={this.handleChange.bind(this)} value={this.state.roomName} type="text" name="roomName" placeholder="Name" />  
          <input type='text' name="password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password} placeholder="Password (optional)"></input>
           <label for="mode">Language:</label>
          <select id="mode" name="mode">
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </select>
        <button onClick={this.submitRoom.bind(this)}>New Room</button>
      </form>
    </div>
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








