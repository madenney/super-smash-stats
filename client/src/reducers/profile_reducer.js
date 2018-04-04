import types from '../actions/types';
const DEFAULT_STATE = {profile: null, matches_info: []};

export default function(state = DEFAULT_STATE, action){
  switch (action.type){
    case types.GET_PLAYER_PROFILE:
      return { ...state, profile: action.payload};
      break;
    case types.GET_PLAYER_MATCHES:
      return { ...state, matches_info: action.payload};
      break;
    //this case deconstructs the matches_info state and returns the new key
    //value pair
    case types.FILTER_PLAYER_TOURNAMENT:
      const { matches_info } = state;
      matches_info.tournament_matches = action.payload.tournament_matches;
      return { ...state, matches_info: {...matches_info}};
    default:
      return state;
  }
}
