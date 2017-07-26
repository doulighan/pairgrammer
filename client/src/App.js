import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {BrowserRouter, Route} from 'react-router-dom'
import SplashPage from './components/SplashPage'
import TypeMessage from './components/TypeMessage'

injectTapEventPlugin()

class App extends Component {
  render() {
    return (

      <div className="App">
        <BrowserRouter>
          <Route path='/' component={SplashPage} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
