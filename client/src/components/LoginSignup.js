import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'


const LoginSignup = () => {
  return (
    <div>
      <Link to={'/login'}>
        <button type='submit'>Login</button>
      </Link>
      <Link to={'/signup'}>
        <button type='submit'>Signup</button>
      </Link>
    </div>
  )
}

export default LoginSignup