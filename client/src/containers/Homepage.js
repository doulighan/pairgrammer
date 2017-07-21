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
    socket.on('requestRooms', (data) => {
      this.props.loadRooms(data)
    })
  }


  render () {
    return (
      <div>
        <h2>Welcome, {this.props.user.username} </h2>
        <Navbar rooms={this.props.rooms} />
          <Switch>
            <Route path='/home/rooms/:roomid' render={p=>{return(<Room {...p} socket={socket} />)}} />
            <Route path='/home' render={p => { return (<RoomForm {...p} socket={socket} /> )}} />
          </Switch>
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









