import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Link } from 'react-router-dom'
import LoginWrapper from './LoginWrapper'
import Homepage from '../containers/Homepage'


const SplashPage = () => {
  return (
    <div>
      <Switch>
        <Route path={'/home'} component={Homepage}/> 
        <Route path={'/'} component={LoginWrapper} />
      </Switch>
    </div>
  )
}


export default SplashPage