import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Navbar extends React.Component {
  constructor() {
    super()
  }

  render () {
    return (
      <div className='nav-scroll'>
          {this.props.rooms.map(room =>
            <div className='nav-item'>
              <Link key={room._id} to={`/home/rooms/${room._id}`}>
                  <div className='x'>{room.name}</div>
              </Link>
            </div>
          )} 
      </div>
    )
  }
}


export default connect(mapStateToProps, null)(Navbar)

function mapStateToProps(state) {
  console.log(state)
  return {
    rooms: state.rooms  
  }
}

