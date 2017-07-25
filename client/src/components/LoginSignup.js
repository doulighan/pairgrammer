import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Header, Icon, Image, Segment, Divider, Button, Container, Grid, Form } from 'semantic-ui-react'



const LoginSignup = () => {
  return (
    <div>
    <Container>
        <Grid className="segment centered stretched">
          <Grid.Row stretched>
                <Link to={'/login'}>
                  <Button big left type='submit'>Login</Button>
                </Link>
                <div style={{'padding':'20px'}}></div>
                <Link to={'/signup'}>
                  <Button big type='submit'>Signup</Button>
                </Link>
          </Grid.Row>
        </Grid>
    </Container>  
    </div>
  )
}

export default LoginSignup