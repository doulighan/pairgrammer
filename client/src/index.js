import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import  { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/index'
import 'semantic-ui-css/semantic.min.css'

export const configureStore = () => {
  return createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

const store = configureStore()


ReactDOM.render(
  <Provider store={store}> 
    <App store={store}/> 
  </Provider>, 
  document.getElementById('root'))

registerServiceWorker()

