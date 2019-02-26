import {actionTypes} from './constant';
import {Modal,message as Message} from 'antd';
const confirm = Modal.confirm;
//修改当前的rooId
export const getBlocks=(blockId)=>(dispatch,getState)=>{
  dispatch({
    type:actionTypes.GET_BLOCKS,
    payload:blockId
  });
}
