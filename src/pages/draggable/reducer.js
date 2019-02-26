import { combineReducers } from 'redux';
import assign from 'object-assign';
import { applicationConfigType } from './constant';
const initialState = {
  applicationConfigData: []
};
const applicationConfigReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case applicationConfigType.GET_APPLICATIONCONFIG_DATA:
      return Object.assign({}, state, {
        applicationConfigData: payload,
      });
    default:
      return state;
  }
};
export default applicationConfigReducer
