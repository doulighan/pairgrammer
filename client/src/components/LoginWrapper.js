import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Switch} from 'react-router-dom'
import LoginSignup from './LoginSignup'
import LoginForm from '../containers/LoginForm'

const LoginWrapper = () => {
  return (
    <div>
    <h1>PAIRGRAMMER</h1>
      <div>
        <Switch>
          <Route path='/login' render={p => { return (<LoginForm {...p} /> )}} />
          <Route path='/' render={p => { return (<LoginSignup {...p} /> )}} />
        </Switch>
      </div>
    </div>
  )
}

export default LoginWrapper