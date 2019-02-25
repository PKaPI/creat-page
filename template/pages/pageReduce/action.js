import {listType} from './constant';
import { message } from 'antd';
import http from '../../../utils/http'
import apiUrl from '../../../constants/apis';

const pageAction = (data) => ({
  type: listType.GET_DATA,
  payload: {
    data,
    reload:true
  }
})
export const getpageAction = (params) => async (dispatch, getState) => {
  try {
      let response = await http.get(apiUrl.getpageAction, params);
      if (response.result) {
          await dispatch(pageAction(response.data));
      } else {
          //返回失败
      }
  } catch (error) {
      console.log('error: ', error)
  }
}
