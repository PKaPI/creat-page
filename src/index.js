import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
//import createHistory from "history/createHashHistory";
import Routers from './router'
import "assets/styles/index.scss";
import "assets/styles/antd.less";
import store from './store'
import '@babel/polyfill'
export const history = createHistory();

const render = Component =>
    ReactDOM.render(
      <Provider store={ store }>
      <Component />
      </Provider>,
       document.getElementById('root')
    )
render(Routers)

if(module.hot) {
  module.hot.accept();
}
