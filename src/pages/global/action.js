import {globalType} from './constant';
import { API } from "@/api/index.js";

const userData = (data) => ({
  type: globalType.GET_USER_DATA,
  payload: data
})
export const getUserData = (params) => async (dispatch, getState) => {
  try {
    API.getUserData(params).then(response =>{ 
      if (response.success) {
        dispatch(userData(response.data));
      } else {
        //返回失败
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}

const navData = (data) => ({
  type: globalType.GET_NAV_DATA,
  payload: data
})
export const getNavData = (params) => async (dispatch, getState) => {
  try {
    API.getNavData(params).then(response =>{ 
      if (response.success) {
        dispatch(navData(response.data));
      } else {
        //返回失败
      }
    });

  } catch (error) {
    console.log('error: ', error)
  }
}


