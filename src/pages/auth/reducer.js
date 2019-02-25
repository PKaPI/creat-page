import login from './login/reducer';
import register from './register/reducer';
import { combineReducers } from 'redux';

const authReducer = combineReducers({
  login,
  register,
})
export default authReducer
