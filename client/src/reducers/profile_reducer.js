import types from '../actions/types';
const DEFAULT_STATE = {profile: null, matches_info: []};

export default function(state = DEFAULT_STATE, action){
  switch (action.type){
    case types.GET_PLAYER_PROFILE:
      return { ...state, profile: action.payload};
      break;
    case types.GET_PLAYER_MATCHES:
      return { ...state, matches_info: action.payload};
    default:
      return state;
  }
}
