import types from "./types";
import axios from "axios";

// Saved for future carousel on front page
export function frontPagePlayers() {
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

export function getSearchResults(search, id, totalPageBoolean) {
	return dispatch => {
		axios
			.post("/autocomplete", {
				input: search,
				pageNum: id,
				resultsPerPage: 20,
				getTotalPages: `${totalPageBoolean ? false : true}`
			})
			.then(response => {
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

export function getPlayerProfile(id) {
	return dispatch => {
		axios.post("/player_profile", { input: id }).then(response => {
			dispatch({
				type: types.GET_PLAYER_PROFILE,
				payload: response.data
			});
			axios
				.post("/match_history", { input: response.data.tag })
				.then(response => {
					let tournaments = [];
					// for (var i = 0; i < response.data.length; i++)
					response.data.forEach(item=>{
						tournaments.push(item.tournament);
					});
					//lodash then filters out the repetitive values of the tournament names
					tournaments = _.uniq(tournaments);
					const tournament_selected = tournaments[0];
					const all_matches_for_tournament = [];
					response.data.forEach(item=>{
						if (tournament_selected === item.tournament) {
							all_matches_for_tournament.push(item);
						}
					});
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

export function filterTournamentMatches(tournament_selected, matches) {
	return dispatch => {
		const all_matches_for_tournament = [];
		matches.forEach(match=>{
			if (tournament_selected === match.tournament) {
				all_matches_for_tournament.push(match);
			}
		});
		var reverse_matches = all_matches_for_tournament.reverse();
		dispatch({
			type: types.FILTER_PLAYER_TOURNAMENT,
			payload: {
				tournament_matches: reverse_matches
			}
		});
	};
}

export function getH2HResults(id1, search) {
	return dispatch => {
		if (search == "top_h2h") {
			search = "";
		}
		axios
			.post("/head2headsearch", {
				player1: id1,
				input: search,
				pageNum: 1,
				resultsPerPage: 20,
				getTotalPages: true
			})
			.then(response => {
				dispatch({
					type: types.GET_H2H_RESULTS,
					payload: {
						name: response.data.name,
						player2results: response.data.outputRows,
						player1: id1,
						totalPages: response.data.totalAvailablePages
					}
				});
			});
	};
}

export function getH2HProfiles(id1, id2) {
	console.log('id 1 id2: ', id1, id2);
	return dispatch => {
		axios.post("/head2headprofile", { id1, id2 }).then(response => {
			console.log("h2hprofile results", response);
			dispatch({
				type: types.GET_H2H_PROFILES,
				payload: response.data
			});
		})
		.catch(error=>{
			console.log('this is error: ', error);
		})
	};
}

export function getStickyVideo(url,timestamp){
	timestamp = Math.floor(timestamp);
	if(url !== null){
		if(url.includes('&start=')){
			let split_url = url.split('&start=');
			url = split_url[0] + '&start=' + timestamp;
		}
		else{
			url = url + '&start=' + timestamp;
		}
		console.log('action creator url: ', url);
		return dispatch =>{
			dispatch({
				type: types.GET_STICKY_VIDEO,
				payload: {
					url: url,
					timestamp: timestamp
				}
			});
		}
	}
}
export function checkStickyVideo(is_sticky){
	return dispatch =>{
		dispatch({
			type: types.CHECK_STICKY_VIDEO,
			payload: is_sticky
		})
	}
}
