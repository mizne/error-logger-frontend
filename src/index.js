import React from "react"
import ReactDOM from "react-dom"

import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
// import { createLogger } from "redux-logger"

import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import "./index.css"
import reducer from './reducers'

const middlewares = [thunk]
// if (process.env.NODE_ENV !== "production") {
//   middlewares.push(createLogger())
// }

const logger = store => next => action => {
  console.groupCollapsed(action.type)
  console.log('prev state', store.getState())
  console.info('dispatching action', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

middlewares.push(logger)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(...middlewares),
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
