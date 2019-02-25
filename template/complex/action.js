
import {smallCamelType} from './constant';
import { message as Message } from 'antd';
import http from 'utils/http'
import {API,URL} from 'api';

const smallCamelData = (data) => ({
  type: smallCamelType.GET_TYPE_DATA,
  payload: data
})
export const getbigCamelData = (params) => async (dispatch, getState) => {
  try {
      let response = await http.get(API.getUserData, params);
      if (response.success) {
          await dispatch(smallCamelData(response.data));
      } else {
          //返回失败
      }
  } catch (error) {
      console.log('error: ', error)
  }
}
