import { combineReducers } from "redux";
import search_results_reducer from "./search_results_reducer";
import profile_reducer from "./profile_reducer";
import h2h_results_reducer from "./h2h_results_reducer";

export default combineReducers({
	results: search_results_reducer,
	profile: profile_reducer,
	h2h_results: h2h_results_reducer
});
