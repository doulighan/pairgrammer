import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Header, Icon, Image, Segment, Divider, Button, Container, Grid, Form } from 'semantic-ui-react'



const LoginSignup = () => {
  return (
    <div>
      <Link to={'/login'}>
        <Button big left type='submit'>Login</Button>
      </Link>
      <div style={{'padding':'20px'}}></div> 
    </div>
  )
}

export default LoginSignup