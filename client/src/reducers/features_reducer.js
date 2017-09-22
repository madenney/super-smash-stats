import types from '../actions/types';
const DEFAULT_STATE = {yt_url: null};

export default function (state = DEFAULT_STATE, action){
  switch(action.type){
    case types.GET_STICKY_VIDEO:
      return {...state, yt_url: action.payload};
    default:
      return state;
  }
}
