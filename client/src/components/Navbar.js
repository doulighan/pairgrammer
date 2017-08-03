import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'

const Navbar = ({rooms}) => {
  return (
    <div className='nav-scroll'>
        {rooms.map(room =>
          <div className='nav-item'>
            <Link key={room._id} to={`/home/rooms/${room._id}`}>
                <div className='x'>{room.name}</div>
            </Link>
          </div>
        )} 
    </div>
  )
}

export default Navbar