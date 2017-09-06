import types from "./types";
import axios from "axios";

export function frontPagePlayers() {
	//front page carousel player cards
	axios
		.post("/front_page", { number: 10 })
		.then(response => {
			this.setState({
				cards: response.data
			});
		})
		.catch(e => {
			console.log("Error", e);
		});
}

export function getSearchResults(search, id) {
	return dispatch => {
		axios
			.post("/autocomplete", {
				input: search,
				pageNum: id,
				resultsPerPage: 20,
				getTotalPages: true
			})
			.then(response => {
				console.log("response", response);
				dispatch({
					type: types.GET_SEARCH_RESULTS,
					payload: {
						player_cards: response.data.players,
						totalPages: response.data.totalAvailablePages
					}
				});
			});
	};
}
