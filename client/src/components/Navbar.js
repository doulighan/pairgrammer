import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'


class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    console.log(this.props)
    return ( 
      <div>
        <ul>
          {this.props.rooms.map(room =>
            <li>
              <Link key={room.id} to={`/home/rooms/${room.id}`}>
                {room.name}
              </Link>
            </li>
          )} 
        </ul>
      </div>
    )
  }
}

export default Navbar