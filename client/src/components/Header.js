import React from 'react'

const Header = ({username}) => {
  return (
    <div className='header-container' >
      <div className='header-titles'>
        <h1>PairGram</h1>
      </div>
      <div className='header-actions'>
        <button className='button-wide button'> Home </button>
        <button className='button-wide button'> Back </button>
        <div className='header-username'>
          <h4>Logged in as: {username}</h4>
        </div>
      </div>
    </div>
  )
}

export default Header