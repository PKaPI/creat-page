import { combineReducers } from 'redux';
import assign from 'object-assign';
import {registerType} from './constant';
const initialState = {
  regiserData: []
};
const registerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case registerType.GET_REGISTER_DATA:
      return Object.assign({}, state, {
        regiserData: payload,
      });
    default:
      return state;
  }
};
export default registerReducer
