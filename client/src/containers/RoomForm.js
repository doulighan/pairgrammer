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
    const mode = (this.state.mode === '') ? 'javascript' : this.state.mode
    const room = {
      name: this.state.roomName,
      id: uuid(),
      mode: mode, 
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
    this.setState({
      mode: e.target.value
    })
  }


  render () {
    return (
      <div className='room-form'>
        <form className="form-style-9">
          <input onChange={this.handleChange.bind(this)} value={this.state.roomName} type="text" name="roomName" placeholder="Name" />  
          <input type='text' name="password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password} placeholder="Password (optional)"></input>
          <select id="mode" name="mode" default='javascript' onChange={this.handleModeChange.bind(this)}>
            <option value='javascript'>javascript</option>
            <option value='java'>java</option>
            <option value='python'>python</option>
            <option value='xml'>xml</option>
            <option value='ruby'>ruby</option>
            <option value='sass'>sass</option>
            <option value='markdown'>markdown</option>
            <option value='mysql'>mysql</option>
            <option value='json'>json</option>
            <option value='html'>html</option>
            <option value='handlebars'>handlebars</option>
            <option value='golang'>golang</option>
            <option value='csharp'>csharp</option>
            <option value='elixir'>elixir</option>
            <option value='typescript'>typescript</option>
            <option value='css'>css</option>
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








