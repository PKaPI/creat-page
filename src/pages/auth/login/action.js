import {loginType} from './constant';
import { API } from "@/api/index.js";

const loginData = (data) => ({
  type: loginType.GET_LOGIN_DATA,
  payload: data
})
export const getLoginData = (params) => async (dispatch, getState) => {
  try {
    API.getUserData(params).then(response =>{ 
      if (response.success) {
        dispatch(loginData(response.data));
      } else {
        //返回失败
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}

