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
      proceed: false
    }
  }

  submitUser(e) {
    e.preventDefault()
    console.log(this.state.username)
    if(this.state.username === '' || this.state.username === ' ' ) return 
    this.props.setUser(this.state.username)
    this.setState({username: '', proceed: true})
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  render () {
    const proceed = (this.state.proceed) ? <Link to={'/home'}><button>Proceed</button></Link> : <div></div>
    return (
      <form>
          <input type="text" onChange={this.handleChange.bind(this)} placeholder="Username"
            value={this.state.username}/>
          <button onClick={this.submitUser.bind(this)}>Submit</button>
          {proceed}
      </form>
    )
  }
}

export default connect(null, mapDispatchToProps)(Login)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setUser: setUser}, dispatch)
}





