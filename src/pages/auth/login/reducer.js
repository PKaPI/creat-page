import { combineReducers } from 'redux';
import assign from 'object-assign';
import {loginType} from './constant';

const initialState = {
  loginData: []
};
const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case loginType.GET_LOGIN_DATA:
      return Object.assign({}, state, {
        loginData: payload,
      });
    default:
      return state;
  }
};
 
export default  loginReducer
