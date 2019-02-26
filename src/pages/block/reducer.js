import {actionTypes} from './constant';

const initialState = {
  blocks:'',
  type:'',
  fliterBlocks:[],
}
export default (state=initialState,action)=>{
  const {type,payload} = action;
  switch(type){
    case actionTypes.DOWNLOAD_BLOCK:
      return Object.assign({},state,{
        blocks:payload
      });
      break;
    case actionTypes.FLITER_BLOCK:
      return Object.assign({},state,{
        fliterBlocks:payload
      });
      break;
    default:
      return state;
  }
}