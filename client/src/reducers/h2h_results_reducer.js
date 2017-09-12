import types from "../actions/types";
const DEFAULT_STATE = { h2h_results: null };

export default function(state = DEFAULT_STATE, action) {
	switch (action.type) {
		case types.GET_H2H_RESULTS:
			return { ...state, h2h_results: action.payload };
			break;
		case types.GET_H2H_PROFILES:
			return { ...state, profiles_results: action.payload };
		default:
			return state;
	}
}
