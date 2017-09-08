import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import { setRoom } from '../actions/rooms'
import { setPermitted } from '../actions/permission'
import { loadRooms } from '../actions/rooms'
import Room from './Room'
import Navbar from '../components/Navbar'
import RoomForm from './RoomForm'
import Header from '../components/Header'
import ChatContainer from './ChatContainer'
import Delay from 'react-delay'
import io from 'socket.io-client'
import RoomInfo from '../components/RoomInfo'

const socket = io('http://192.168.6.213:3000')

class Homepage extends React.Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
      search: '',
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

  handleSearchChange(e) {
    this.setState({search: e.target.value})
  }

  filter(search) {
    return this.state.rooms.filter(r => 
        r.name.toLowerCase().includes(search.toLowerCase()))
  }

  render () {

    const rooms = (this.state.search !== '') ? this.filter(this.state.search) : this.state.rooms
    
    if(!this.props.user.username) {this.props.history.push('/')}
    var navbar = (this.state.rooms) ? <Navbar rooms={rooms} /> : <div/>
    var roomInfo = (this.props.room) ? <RoomInfo room={this.props.room} user={this.props.user} /> : <div>Not in room</div>

    if(this.props.location.pathname === '/home') {
      this.props.setPermitted(false)
     }
     if(!this.props.permitted && this.props.location.pathname === '/home') {
      roomInfo = <div className='welcome-info'>
                  <h2>Welcome to Pairgrammer!</h2>
                  <h3>Join an open room below, or create a new room</h3>
                 </div>
    }

    return (
      <div>
        <Header username={this.props.user.username} /> 

        <div className='home-container'>
          <div className='left-panel'>
            <div className='navbar-container box'>
              {navbar}
              <div className='nav-info'>
                <input type='text' placeholder='Search' onChange={this.handleSearchChange.bind(this)} value={this.state.search} className='filterbox'/>
                <h2>Rooms</h2>            
              </div>  
            </div>
            <div className='room-info box'>
              {roomInfo}
            </div>
          </div>
          <div className='editor-panel'>
            <Route exact path='/home' render={p => { return(<RoomForm socket={socket}/>)}} />
            <Route exact path='/home/rooms/:roomid' render={p => { return(<Room user={this.props.user} {...p} socket={socket} roomid={p.match.params.roomid}/>)}} />
          </div>
          <div className='right-panel'>
            <div className='chat-container box'>
              <ChatContainer user={this.props.user} socket={socket} />
              <div className='chat-info' >
                <h2>Chat</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)


function mapStateToProps(state) {
  return {
    user: state.user,  
    room: state.room,
    permitted: state.permitted  
  }
}

function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({
      setRoom: setRoom, 
      setPermitted: setPermitted
    }, dispatch)
  )
}









