import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import { loadRooms } from '../actions/rooms'
import Room from './Room'
import Navbar from '../components/Navbar'
import RoomForm from './RoomForm'
import Header from '../components/Header'
import ChatContainer from './ChatContainer'
import Delay from 'react-delay'
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
      this.setState({rooms: data})
    })
  }

  componentDidMount() {    
    socket.emit('addPerson', this.props.user)
  }

  //<RoomForm socket={socket} />
  render () {
    // if(!this.props.user.username) {this.props.history.push('/login')}
    var navbar = (this.state.rooms) ? <Navbar rooms={this.state.rooms} /> : <div></div>
    return (
      <div>
        <Header username={this.props.username} /> 
        <div className='home-container'>
          <div className='left-panel'>
            <div className='navbar-container box'>
              <Navbar rooms={this.state.rooms} />
              <div className='nav-info'>
                <h2>Rooms</h2>
                <RoomForm socket={socket} />
              </div>  
            </div>
            <div className='chat-container box'>
              <ChatContainer user={this.props.user} socket={socket}/>
              <div className='chat-info' />
                <h2>Chat</h2>
            </div>
          </div>
          <div className='editor-panel'>
            <Route path='/home/rooms/:roomid' render={p=>{return(<Room user={this.props.user} {...p} socket={socket} />)}} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Homepage)


function mapStateToProps(state) {
  return {
    user: state.user,  
    room: state.room  
  }
}









