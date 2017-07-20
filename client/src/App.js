import React, { Component } from 'react'
import Editor from './containers/Editor'

class App extends Component {
  render() {
    return (
      <div className="App" style={{'backgroundColor':"grey"}}>
        <Editor />
      </div>
    )
  }
}

export default App
