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
    this.classNames = ['editor-animate-div']
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.roomid !== this.props.match.params.roomid) {
      this.initialize(nextProps.match.params.roomid)
    }
  }

  initialize(roomid) {
    this.props.socket.emit('joinRoom', roomid )
    this.props.socket.on('sendRoom', (room) => {
      console.log('INCOMING: ', room)
      this.props.setRoom(room)
      this.setState({room: room})
    }, this.render())
    setTimeout(this.generateColor.bind(this), 250)
  }
  
  componentDidMount() {
    this.initialize(this.props.match.params.roomid)
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

  loading() {
    if(this.state.room._id) {
      return (
        <div className='editor-animate-div'>   
            <Editor socket={this.props.socket} room={this.state.room} user={this.props.user} />
        </div> 
      )
    } else {
      return (
        <div></div>
      )
    }
  }


  render() {
    const load = this.loading()
    return (
      <div>
        {load}
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


