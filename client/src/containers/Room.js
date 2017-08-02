import React from 'react'  
import {connect} from 'react-redux'  
import {bindActionCreators} from 'redux'
import { setRoom } from '../actions/rooms'
import { setColor } from '../actions/colors'
import { setPermitted } from '../actions/permission'
import Editor from './Editor'
import Delay from 'react-delay'
import ChatContainer from './ChatContainer'
import {Grid, Segment, Sidebar, Menu} from 'semantic-ui-react' 

class Room extends React.Component {  
  constructor() {
    super()
    this.state = {
      room: {},
      pass: '',
    }
    this.colors = ['#66D9EF', '#F92672', '#A6E22E', '#FD971F']
  }

  handlePassChange(e) {
    console.log(e.target.value)
    this.setState({pass: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.pass === this.state.room.password) {
      this.setState({pass: ''})
      this.props.setPermitted(true)
    } else {
      window.alert('Incorrect Password!')
      this.setState({pass: ''})
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.roomid !== this.props.match.params.roomid) {
      this.setState({room: {}, pass: ''})
      this.props.setRoom(null)
      this.props.setColor(null)
      this.props.setPermitted(false)
      this.props.socket.emit('leaveRoom', this.props.match.params.roomid)
      this.initialize(nextProps.match.params.roomid)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState === this.state && nextProps === this.props && nextState.room.password == undefined) {
      return false
    }
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    
    if(nextState.room._id !== this.state.room._id) {
      this.props.setPermitted(false)
    }
    if(this.props.permitted) return
    if(nextState.room.password === '') {
      this.props.setPermitted(true)
    }
  }

  initialize(roomid) {
    this.props.socket.emit('joinRoom', roomid )
    this.props.socket.on('sendRoom', (room) => {
      console.log('INCOMING: ', room)
      this.props.setRoom(room)
      this.setState({room: room})
    }, setTimeout(this.generateColor.bind(this), 250)
    )
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

  editor() {
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


  loading() {
    if(!this.props.permitted){
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='password' name='pass' 
              value={this.state.pass} placeholder='Enter password...'
              onChange={this.handlePassChange.bind(this)} />
          <button type='submit' className='button button-wide'>Submit</button>
        </form>
        )
      } 
      else {
        return this.editor()
    }
  }


  render() {
    return (
      <div>
        <Delay wait={500}>
          {this.editor()}
        </Delay>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
    user: state.user,
    permitted: state.permitted
  }
}

function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({
      setRoom: setRoom, 
      setColor: setColor,
      setPermitted: setPermitted
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)


