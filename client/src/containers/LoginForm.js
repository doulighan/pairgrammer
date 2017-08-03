import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Homepage from './Homepage'


import { setUser } from '../actions/users'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
    }
  }

  submitUser(e) {
    e.preventDefault()
    const username = this.state.username.replace(/^\s+/, '').replace(/\s+$/, '')
    if(username === '') {
      window.alert('Please enter a username') 
      this.setState({username: ''})
      return
    }
    if(this.state.username.length > 26){
      window.alert('Please enter a username shorter than 25 characters')
      this.setState({username: ''})
      return 
    }

    this.props.setUser(this.state.username)
    this.setState({username: ''})
    this.props.history.push('/home')
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  render () {
    return (
      <div>
        <form className='login'>
          <input type="text" onChange={this.handleChange.bind(this)} placeholder="Username" className='logintext'
              value={this.state.username}/>
          <button onClick={this.submitUser.bind(this)}>Submit</button>
        </form> 
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Login)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setUser: setUser}, dispatch)
}





