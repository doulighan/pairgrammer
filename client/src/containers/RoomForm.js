import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Homepage from './Homepage'

import { setUser } from '../actions/users'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      roomName: ''
    }
  }

  submitRoom(e) {
    e.preventDefault()
    console.log(this.state.username)
    if(this.state.roomName === '' || this.state.roomName === ' ' ) return 
    this.props.createRoom(this.state.roomName)
    this.setState({roomName: '', proceed: true})
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    })
  }

  render () {
    const proceed = (this.state.proceed) ? <Link to={`/rooms/${roomName}`}><button>Proceed</button></Link> : <div></div>
    return (
      <form>
          <input type="text" onChange={this.handleChange.bind(this)} placeholder="Username"
            value={this.state.username}/>
          <button onClick={this.submitUser.bind(this)}>Submit</button>
          {proceed}
      </form>
    )
  }
}

export default connect(null, mapDispatchToProps)(Login)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createRoom: createRoom}, dispatch)
}

function mapStateToProps(state) {
  return {room: state.room}
}








