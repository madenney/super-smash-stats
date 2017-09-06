import types from "../actions/types";
const DEFAULT_STATE = { results: null };

export default function(state = DEFAULT_STATE, action) {
	switch (action.type) {
		case types.GET_SEARCH_RESULTS:
			return { ...state, results: action.payload };
		default:
			return state;
	}
}
