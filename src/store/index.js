
import { createStore, applyMiddleware, combineReducers,compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import appReducer from 'pages/global';
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
export const history = createHistory();
const middleware = routerMiddleware(history);
const middlewares = [thunk, middleware];

const store = createStore(
  combineReducers({ routing: routerReducer, ...appReducer }),
  process.env.NODE_ENV=='production' ? applyMiddleware(...middlewares): composeWithDevTools(applyMiddleware(...middlewares))
)
export default   store;
