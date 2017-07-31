import React from 'react'  
import {connect} from 'react-redux'  
import {bindActionCreators} from 'redux'
import { setRoom } from '../actions/rooms'
import { setColor } from '../actions/colors'
import Editor from './Editor'
import Delay from 'react-delay'
import ChatContainer from './ChatContainer'
import {Grid, Segment, Sidebar, Menu} from 'semantic-ui-react' 

class Room extends React.Component {  
  constructor() {
    super()
    this.state = {
      room: {},
    }
    this.colors = ['#66D9EF', '#F92672', '#A6E22E', '#FD971F']
  }
  
  componentDidMount() {
    this.props.socket.emit('joinRoom', this.props.match.params.roomid )
    this.props.socket.on('sendRoom', (room) => {
      this.props.setRoom(room)
      this.setState({room: room}, this.generateColor.bind(this))
    })
  }

  componentWillUnmount() {
    this.props.socket.emit('leaveRoom', this.props.match.params.roomid)
  }

  generateColor() {
    console.log('GEN COLOR')
    if(!this.state.room.users) return
    let color = this.colors[(this.state.room.users.length-1) % 4]
    this.props.setColor(color)
    this.props.socket.emit('setColor', {roomid: this.props.match.params.roomid, color: color})
  }

     // <h4>Currently in room:</h4>
     //      <ul>{peopleList}</ul>
  render() {
    var peopleList = ''
    if(this.state.room.users){
      peopleList = this.state.room.users.map(p => {
        if(p){
          return <li key={p._id}>{p.username}</li>
        }
      })
    }
    return (
      <div>
        <Delay wait={1000}>
          <div>   
            <Editor socket={this.props.socket} room={this.state.room} user={this.props.user} />
          </div> 
        </Delay>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({setRoom: setRoom, setColor: setColor}, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)


