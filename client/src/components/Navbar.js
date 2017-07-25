import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'


class Navbar extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render () {
    return ( 
      <div>
        <ul>
          {this.props.rooms.map(room =>
            <li>
              <NavLink key={room._id} to={`/home/rooms/${room._id}`}>
                {room.name}
              </NavLink>
            </li>
          )} 
        </ul>
      </div>
    )
  }
}

export default Navbar