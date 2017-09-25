import types from '../actions/types';
const DEFAULT_STATE = {yt_url: null, sticky_yt_player: false};

export default function (state = DEFAULT_STATE, action){
  switch(action.type){
    case types.GET_STICKY_VIDEO:
      return {...state, yt_url: action.payload};
    case types.CHECK_STICKY_VIDEO:
      return { ...state, sticky_yt_player: action.payload};
    default:
      return state;
  }
}
