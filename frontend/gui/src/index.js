import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/auth';

// const logger = store => next => action => {
//   console.group(action.type)
//   console.info('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.groupEnd(action.type)
//   return result
// }

// inherits from window
const composeEnhances = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose

//second argument is an enhancer
    // composeEnhances takes in params and inside will handle our MIDDLEWARE
const store = createStore(rootReducer, composeEnhances(
  applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <App />
  </Provider>

)



ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
