import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Switch} from 'react-router-dom'
import LoginSignup from './LoginSignup'
import LoginForm from '../containers/LoginForm'
import { Header, Icon, Image, Segment, Button, Divider } from 'semantic-ui-react'

const LoginWrapper = () => {
  return (
    <div>
      <Segment inverted color='blue' className='title' style={{'margin':'60px'}}>
        <Header className='icon' as='h1' icon textAlign='center' >
          <Icon name='blind' massive/>
          <Header.Content center>
              co-op
          </Header.Content>
        </Header>
      </Segment>
        <Divider fitted/>
        <Switch>
          <Route path='/login' render={p => { return (<LoginForm {...p} /> )}} />
          <Route path='/' render={p => { return (<LoginSignup {...p} /> )}} />
        </Switch>
    </div>
  )
}

export default LoginWrapper