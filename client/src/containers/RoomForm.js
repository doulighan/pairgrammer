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
    const input = this.state.roomName.replace(/^\s+/, '').replace(/\s+$/, '')
    if(input === ''){ 
      window.alert('Please enter a name!')
      this.setState({roomName: ''})
      return 
    }
    if(this.state.roomName.length > 26){
      window.alert('Please enter a name shorter than 25 characters')
      this.setState({roomName: ''})
      return
    }
    const mode = (this.state.mode === '') ? 'javascript' : this.state.mode
    const rom = {
      name: this.state.roomName,
      id: uuid(),
      mode: mode, 
      code: '',
      password: this.state.password
    }
    this.props.createRoom(rom)
    this.props.socket.emit('makeRoom', rom)
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
      <div className='room-form-div box'>
        <h2>New Room</h2>
        <form className="form">
          <input onChange={this.handleChange.bind(this)} value={this.state.roomName} type="text" name="roomName" placeholder="Name" className='textbox'/>  
          <input type='text' name="password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password} placeholder="Password (optional)" className='textbox'></input>
          <label>Language:</label>
          <select id="mode" name="mode" default='javascript' onChange={this.handleModeChange.bind(this)} className='select'>
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
        <div>
          <button className='newroom button' onClick={this.submitRoom.bind(this)}>New Room</button>
        </div>
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








