import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'



const LoginSignup = () => {
  return (
    <div>
      <Link to={'/login'}>
        <button big left type='submit'>Login</button>
      </Link>
      <div style={{'padding':'20px'}}></div> 
    </div>
  )
}

export default LoginSignup