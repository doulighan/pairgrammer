import React from 'react'
import logo from '../pear_icon.png';
import {Link} from 'react-router-dom'


const Header = ({username}) => {
  return (
    <div className='header-container' >
      <div className='header-titles'>
        <h1>PairGrammer</h1>
        <img src={logo} style={{'width':'55px', 'height':'55px', 'margin-bottom':'8px'}}alt='pear' />
      </div>

      <div className='header-actions'>
        <Link to={'/home'}>
          <button className='button-wide button'> Home </button>
        </Link>
        <button className='button-wide button'> Back </button>

        <div className='header-username'>
          <h4>Logged in as: {username}</h4>
        </div>
      </div>
    </div>
  )
}

export default Header