import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'
import Editor from './Editor'

import socket from 'socket.io-client'

class Homepage extends React.Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
      currentRoom: []
    }
  }

  componentDidMount() {

  }


  render () {
    return (
      <div>
        <h2>Welcome, {this.props.user.username} </h2>

      </div>
    )
  }
}

export default connect(mapStateToProps)(Homepage)

function mapStateToProps(state) {
  console.log(state)
  return {user: state.user}
}






