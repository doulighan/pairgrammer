import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'


class Navbar extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render () {
    const rooms = []
    for (var id in this.props.rooms) {
       var room = this.props.rooms[id];
        rooms.push(room)
    }
    return ( 
      <div>
        <ul>
          {rooms.map(room =>
            <li>
              <NavLink key={room.id} to={`/home/rooms/${room.id}`}>
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