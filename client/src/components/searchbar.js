import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Autocomplete from './autocomplete';
import "./searchbar.css";

export default class SearchBar extends Component {

    constructor(props){
        super(props);
        let player1 = {
            id: 1,
            name: '',
            isValid: false
        };
        let player2 = {
            id: 2,
            name: '',
            isValid: false
        };
        this.state = {
            autocomCards: [],
            currentIndex : -1,
            complete: '',
            player1,
            player2,
            vsSpace: '',
            vs : false
        };
    }

    handleChange(e) {

        // To navigate somewhere:
        // this.props.history.push('/destination');

        let {player1, player2, vs, vsSpace, complete, autocomCards, currentIndex} = this.state;
        console.log("Handling Change");
        e.preventDefault();
        let charCode = e.keyCode;
        let key = e.key;
        if((charCode >= 33 && charCode <= 126)) {   // <<<<<<<<<<<<<<<<<< Letter/Number
            console.log("Letter Pressed: " + key);
            if(vs === false){
                if(charCode === 86 && player1.isValid){
                    this.setState({
                        vsSpace: '',
                        vs: true,
                        complete: ''
                    })
                } else {
                    player1.name += key;
                    this.autocomplete(player1);
                }
            } else {
                player2.name += key;
                this.autocomplete(player2);
            }
        } else if(charCode === 9) {                  // <<<<<<<<<<<<<<<<<< Tab
            console.log("Tab Pressed");
            if (player1.name.length === 0) {
                return false;
            }
            if (player1.isValid === false) {
                if(complete === '') {
                    return false;
                } else {
                    currentIndex = 0;
                    player1.name = autocomCards[currentIndex].tag;
                    player1.isValid = true;
                    player1.playerId = autocomCards[currentIndex].id;
                    this.setState({player1, currentIndex, complete: ''});
                    return false;
                }
            } else if( player1.isValid === true && vs === false) {
                if(vsSpace === ''){
                    this.tabComplete(autocomCards, player1, ++currentIndex)
                } else {
                    this.setState({
                        vsSpace: '',
                        vs: true,
                        complete: ''
                    })
                }
            } else if(vs === true) {
                if(player2.name.length === 0) {
                    return false;
                }
                if (player2.isValid === false) {
                    if(complete === '') {
                        return false;
                    } else {
                        currentIndex = 0;
                        player2.name = autocomCards[currentIndex].tag;
                        player2.isValid = true;
                        player2.playerId = autocomCards[currentIndex].id;
                        this.setState({player2, currentIndex, complete: ''});
                        return false;
                    }
                } else {
                    this.tabComplete(autocomCards, player2, ++currentIndex);
                    return false;
                }
            }

        } else if(charCode === 32) {                   // <<<<<<<<<<<<<<<<<<<<<<<<<<<< Space Bar
            console.log("Space Pressed");
            if(player1.name.length === 0) { // 1
                return false;
            }
            if(vs === false){
                if(player1.isValid) {
                    this.setState({vsSpace: ' ', complete: 'vs '});
                    return false;
                }
                if(player1.name[player1.name.length-1] !== ' '){ // 2,3
                    player1.name += key;
                    this.autocomplete(player1);
                } else { // 4
                    return false;
                }
            } else {
                if(player2.name.length === 0) { // 5,6
                    return false;
                }
                if(player2.name[player2.name.length-1] !== ' '){ // 7,8
                    player2.name += key;
                    this.autocomplete(player2);
                } else { // 9
                    return false;
                }
            }

        } else if(charCode === 13) {                 // <<<<<<<<<<<<<<<<<<<<<<<< Enter
            console.log("Enter Pressed");
            if(player1.name.length === 0){
                this.props.history.push('/results/noSearch/1'); // If empty search bar
                return false;
            }
            if(!vs) {
                if(player1.isValid) {
                    this.props.history.push('/player_profile/' + autocomCards[currentIndex].id);   // Player Profile Call
                } else {
                    this.props.history.push('/results/'+player1.name+'/1'); // Search Results One players
                }
            } else {
                if(player2.isValid){
                    this.props.history.push('/head2headprofile/'+player1.playerId+'/'+player2.playerId); // Head 2 Head Profile
                } else {
                    this.props.history.push('/head2headresults/'+player1.playerId+'/'+player2.name); // Head 2 Head Results
                }
            }
        } else if(charCode === 8) {                 // <<<<<<<<<<<<<<<<<<<<<<<<<< Backspace
            console.log("Backspace Pressed");
            if(player1.name.length === 0) {
                return false;
            }
            if(vs === false) {
                player1.name = player1.name.substr(0, player1.name.length-1);
                if(player1.name.length > 0) {
                    this.autocomplete(player1);
                } else {
                    this.setState({player1, complete: '', currentIndex: 0, autocomCards: []})
                }
            } else if( vsSpace === ' ') {
                this.setState({vsSpace: ''});
            } else {
                if(player2.name.length === 0) {
                    this.setState({vs: false});
                } else {
                    player2.name = player2.name.substr(0, player2.name.length-1);
                    if(player2.name.length > 0) {
                        this.autocomplete(player2);
                    } else {
                        this.setState({player2, complete: '', currentIndex: 0, autocomCards: []})
                    }
                }
            }
        }else {
            console.log("Invalid Press");
            return false;
        }

        return false;
    }

    tabComplete(cards, player, index) {
        console.log("Tab Completing");
        console.log('INDEX: ', index);
        if(index >= cards.length) {
            index = 0;
        }
        player.name = cards[index].tag;
        if(player.id === 1) {
            this.setState({
                player1: player,
                currentIndex: index,
                complete: ''
            });
        } else {
            this.setState({
                player2: player,
                currentIndex: index,
                complete: ''
            })
        }
    }

    autocomplete(player) {
        console.log("Autocompleting");
        axios.post('http://localhost:3030/autocomplete', { input: player.name, pageNum: 1, resultsPerPage: 10 }).then((response) => {
            // Check for valid player name
            for(var i = 0; i < response.data.players.length; i++) {
                if(response.data.players[i].tag.toLowerCase() === player.name.toLowerCase()) {
                    player.isValid = true;
                    player.playerId = autocomCards[currentIndex].id;
                    player.name = response.data.players[i].tag;
                    break;
                }
            }
            if(i === response.data.players.length) {
                player.isValid = false;
            }

            let autocom = '';
            if(player.isValid && player.id === 1){
                autocom = ' vs ';
            } else {
                if(response.data.players[0]){
                    autocom = response.data.players[0].tag.substr(player.name.length);
                }
            }

            if(player.name.length === 0) {
                autocom = '';
            }

            if(player.id === 1) {
                this.setState({
                    player1: player,
                    autocomCards: response.data.players,
                    complete: autocom,
                });
            } else {
                this.setState({
                    player2: player,
                    autocomCards: response.data.players,
                    complete: autocom,
                });
            }
        });
    }

    searchClicked() {
        const {player1, player2, vs} = this.state;
        console.log("Enter Pressed");
        if(player1.name.length === 0){
            this.props.history.push('/results/noSearch/1'); // If empty search bar
            return false;
        }
        if(!vs) {
            if(player1.isValid) {
                this.props.history.push('/player_profile/' + player1.playerId);   // Player Profile Call
            } else {
                this.props.history.push('/results/'+player1.name+'/1'); // Search Results One players
            }
        } else {
            if(player2.isValid){
                this.props.history.push('/head2headprofile/'+player1.playerId+'/'+player2.playerId); // Head 2 Head Profile
            } else {
                if(player2.name.length === 0) {
                    this.props.history.push('/head2headresults/'+player1.playerId+'/noSearch'); // Head 2 Head Results
                } else {
                    this.props.history.push('/head2headresults/'+player1.playerId+'/'+player2.name); // Head 2 Head Results
                }
            }
        }
    }

    buildOutput(){

        const {player1, player2, vs, vsSpace, complete} = this.state;

        console.log("Building Output: ");
        // console.log('player1: ', player1);
        // console.log('player2: ', player2);
        // console.log('vs: ', vs);
        // console.log('complete: ', complete);
        return(
            <div className="searchBar" onClick={() => {this.searchInput.focus();}}>
                <div className={`sbElement ${player1.isValid ? 'validName' : 'invalidName'}`} >{player1.name}</div>
                <div className="sbElement">{vsSpace}</div>
                {vs ? <div className="sbElement vs" > VS </div> : <div className="sbElement"></div>}
                {player2.name.length > 0 ? <div className={`sbElement ${player2.isValid ? 'validName' : 'invalidName'}`} >{player2.name}</div> : <div className="sbElement"></div>}
                <input autoFocus className="inputLine" type="text" onKeyDown={(e) => this.handleChange(e)} ref={(ip) => {this.searchInput = ip;}}/>
                <div className="sbElement complete">{complete}</div>
            </div>
        );
    }

    render(){
        console.log("Rendering");
        return (
            <div className='col-md-4 offset-md-4'>
                <div className='input-group searchBarContainer'>
                    {this.buildOutput()}
                    <div className='btn btn-outline-warning' onClick={() => this.searchClicked()}>Search</div>
                </div>
                <Autocomplete recommendations = {this.state.autocomCards} />
            </div>
        )
    }
}
