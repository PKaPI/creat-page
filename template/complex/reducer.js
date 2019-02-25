import assign from 'object-assign';
import { smallCamelType } from './constant';
const initialState = {
  smallCamelData: []
};
const smallCamelReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case smallCamelType.GET_TYPE_DATA:
      return Object.assign({}, state, {
        smallCamelData: payload,
      });
    default:
      return state;
  }
};
export default smallCamelReducer
