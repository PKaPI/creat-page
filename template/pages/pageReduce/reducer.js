import assign from 'object-assign';
import {listType} from './constant';
const initialState = {
  pageOne: []
};
 const pageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case listType.GET_DATA:
      return Object.assign({}, state, {
        pageOne: payload,
      });
    default:
      return state;
  }
};
export default pageReducer
