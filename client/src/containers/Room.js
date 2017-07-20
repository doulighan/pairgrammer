import React from 'react';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

class Room extends React.Component {  
  componentDidMount() {
    if (this.props.roomName == undefined) {
      console.log("NO ROOM!?")
    } else
    socket.emit('room1')
  }

  render() {
    return (
      <div>
        <h1>{this.props.room.name}</h1>
        <p>{this.props.challenge.description}</p>
        <Editor />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {  
  if (state.challenges.length > 0) {
    const challenge = state.challenges.filter(challenge => 
      {return challenge.id == ownProps.params.id})[0]
    return {challenge: challenge}
  } else {
    return {challenge: {title: '', description: ''}}
  }
}

function mapDispatchToProps(dispatch) {  
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)