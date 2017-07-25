import React from 'react'  
import {connect} from 'react-redux'  
import {bindActionCreators} from 'redux'
import { getCurrentRoom } from '../actions/rooms'
import Editor from './Editor'
import Delay from 'react-delay'
import ChatContainer from './ChatContainer'
import {Grid, Segmemt} from 'semantic-ui-react' 

class Room extends React.Component {  
  constructor() {
    super()
    this.state = {
      room: {},
    }
  }
  
  componentDidMount() {
    this.props.socket.emit('joinRoom', this.props.match.params.roomid )
    this.props.socket.on('sendRoom', (room) => this.setState({room: room}))
  }

  componentWillUnmount() {
    this.props.socket.emit('leaveRoom', this.props.match.params.roomid)
  }

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
            <Grid padded>
              <h1>{this.state.room.name}</h1>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <h4>Currently in room:</h4>
                  <Editor socket={this.props.socket} room={this.state.room} />
                </Grid.Column>
                <Grid.Column>
                  <ul>{peopleList}</ul>
                  <ChatContainer socket={this.props.socket} room={this.state.room} user={this.props.user}  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Delay>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    user: state.user    
  }
}

export default connect(mapStateToProps, null)(Room)


