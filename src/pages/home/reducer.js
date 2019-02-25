import assign from 'object-assign';
import {homeType} from './constant';
const initialState = {
  homeData: []
};
 const homeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case homeType.GET_HOME_DATA:
      return Object.assign({}, state, {
        homeData: payload,
      });
    default:
      return state;
  }
};

export default homeReducer
