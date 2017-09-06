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

//do axios call for get player profile
//nested axios call that uses lodash to find unique tournaments
export function getPlayerProfile(id) {
	return dispatch => {
		axios.post("/player_profile", { input: id }).then(response => {
			console.log("this is player profile response", response);
			dispatch({
				type: types.GET_PLAYER_PROFILE,
				payload: response.data
			});
			axios
				.post("/match_history", { input: response.data.tag })
				.then(response => {
					let tournaments = [];
					for (var i = 0; i < response.data.length; i++) {
						tournaments.push(response.data[i].tournament);
					}
					//lodash then filters out the repetitive values of the tournament names
					tournaments = _.uniq(tournaments);
					const tournament_selected = tournaments[0];
					const all_matches_for_tournament = [];
					for (var i = 0; i < response.data.length; i++) {
						if (tournament_selected === response.data[i].tournament) {
							all_matches_for_tournament.push(response.data[i]);
						}
					}
					var reverse_matches = all_matches_for_tournament.reverse();
					dispatch({
						type: types.GET_PLAYER_MATCHES,
						payload: {
							matches: response.data,
							tournaments_attended: tournaments,
							tournament_matches: reverse_matches
						}
					});
				});
		});
	};
}

// export function filterTournamentMatches()
