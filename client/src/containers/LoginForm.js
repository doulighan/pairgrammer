import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Homepage from './Homepage'
import { Header, Icon, Image, Segment, Button, Divider, Form, Input, Grid, Container } from 'semantic-ui-react'


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
    if(this.state.username === '' || this.state.username === ' ' ) return 
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
        <Container>
          <Grid className="segment centered stretched">
            <Grid.Row stretched>
              <Form centered stretched>
                <Input type="text" onChange={this.handleChange.bind(this)} placeholder="Username"
                    value={this.state.username}/>
                <Input type="text" placeholder="Password"/>
                <Button onClick={this.submitUser.bind(this)}>Submit</Button>
              </Form>
              <div style={{'padding':'20px'}}></div>
            </Grid.Row>
          </Grid>
        </Container>  
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Login)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setUser: setUser}, dispatch)
}





