import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import { loadRooms } from '../actions/rooms'
import Room from './Room'
import Navbar from '../components/Navbar'
import RoomForm from './RoomForm'
import io from 'socket.io-client'

const socket = io('http://192.168.5.178:3000')

class Homepage extends React.Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
      user: {}
    }
  }

  componentWillMount() {
    socket.emit('requestRooms', 'hello')
    var i = 0
    socket.on('requestRooms', (data) => {
      this.props.loadRooms(data)
    })
  }

  componentDidMount() {    
    socket.emit('addPerson', this.props.user)
  }


  render () {
    return (
      <div>
        <h2>Welcome, {this.props.user.username} </h2>
        <Route  path='/home' render={p => { return (<Navbar rooms={this.props.rooms} {...p}/> )}} />
        <Route  path='/home' render={p => { return (<RoomForm {...p} socket={socket} /> )}} />
        <Route path='/home/rooms/:roomid' render={p=>{return(<Room user={this.props.user} {...p} socket={socket} />)}} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loadRooms: loadRooms}, dispatch)
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    user: state.user    
  }
}









