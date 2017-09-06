import { combineReducers } from "redux";
import search_results_reducer from "./search_results_reducer";

export default combineReducers({
	results: search_results_reducer
});
