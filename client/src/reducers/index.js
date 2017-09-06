import { combineReducers } from "redux";
import search_results_reducer from "./search_results_reducer";
import profile_reducer from './profile_reducer';
export default combineReducers({
	results: search_results_reducer,
	profile: profile_reducer
});
