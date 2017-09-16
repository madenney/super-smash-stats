import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Autocomplete from "./autocomplete";
import "../css/searchbar.css";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        let player1 = {
            id: 1,
            name: "",
            isValid: false
        };
        let player2 = {
            id: 2,
            name: "",
            isValid: false
        };
        this.state = {
            autocomCards: [],
            currentIndex: -1,
            complete: "",
            player1,
            player2,
            vsSpace: "",
            vs: false,
            android: false,
            testString: "Hello World"
        };
    }

    handleChange(e) {
        // To navigate somewhere:
        // this.props.history.push('/destination');

        // Check for broken android mobile browser keycode
        if(e.keyCode === 229) {
            this.android = true;
            return;
        }

        if(e.preventDefault){
            e.preventDefault();
        }

        let {
            player1,
            player2,
            vs,
            vsSpace,
            complete,
            autocomCards,
            currentIndex
        } = this.state;

        let charCode = e.keyCode;
        let key = e.key;

        // If key pressed is a character or number
        if (charCode >= 48 && charCode <= 90) {
            if (vs === false) {
                // If the V button was pressed and player1 is valid
                if (charCode === 86 && player1.isValid) {
                    this.setState({
                        vsSpace: "",
                        vs: true,
                        complete: "",
                        autocomCards: []
                    });
                } else {
                    player1.name += key;
                    this.autocomplete(player1);
                }
            } else {
                player2.name += key;
                this.autocomplete(player2);
            }
        }
        // If key pressed was tab or arrow key
        else if (
            charCode === 9 ||
            charCode === 37 ||
            charCode === 38 ||
            charCode === 39 ||
            charCode === 40
        ) {
            if (player1.name.length === 0) {
                return false;
            }
            if (player1.isValid === false) {
                if (complete === "") {
                    return false;
                } else {
                    currentIndex = 0;
                    player1.name = autocomCards[currentIndex].tag;
                    player1.isValid = true;
                    player1.playerId = autocomCards[currentIndex].id;
                    this.setState({ player1, currentIndex, complete: "" });
                }
            } else if (player1.isValid === true && vs === false) {
                if (vsSpace === "") {
                    if (charCode === 9 || charCode === 39 || charCode === 40) {
                        this.tabComplete(autocomCards, player1, ++currentIndex);
                    } else {
                        this.tabComplete(autocomCards, player1, --currentIndex);
                    }
                } else {
                    this.setState({
                        vsSpace: "",
                        vs: true,
                        complete: "",
                        autocomCards: []
                    });
                }
            } else if (vs === true) {
                if (player2.name.length === 0) {
                    return false;
                }
                if (player2.isValid === false) {
                    if (complete === "") {
                        return false;
                    } else {
                        currentIndex = 0;
                        player2.name = autocomCards[currentIndex].tag;
                        player2.isValid = true;
                        player2.playerId = autocomCards[currentIndex].id;
                        this.setState({ player2, currentIndex, complete: "" });
                    }
                } else {
                    if (charCode === 9 || charCode === 39 || charCode === 40) {
                        this.tabComplete(autocomCards, player2, ++currentIndex);
                    } else {
                        this.tabComplete(autocomCards, player2, --currentIndex);
                    }
                }
            }
        }
        // If the key pressed was the space bar
        else if (charCode === 32) {
            if (player1.name.length === 0) {
                // 1
                return false;
            }
            if (vs === false) {
                if (player1.isValid) {
                    this.setState({
                        vsSpace: " ",
                        complete: "vs ",
                        autocomCards: []
                    });
                    return false;
                }
                if (player1.name[player1.name.length - 1] !== " ") {
                    // 2,3
                    player1.name += key;
                    this.autocomplete(player1);
                } else {
                    // 4
                    return false;
                }
            } else {
                if (player2.name.length === 0) {
                    // 5,6
                    return false;
                }
                if (player2.name[player2.name.length - 1] !== " ") {
                    // 7,8
                    player2.name += key;
                    this.autocomplete(player2);
                } else {
                    // 9
                    return false;
                }
            }
        }
        // If the key pressed was Enter
        else if (charCode === 13) {
            if (player1.name.length === 0) {
                this.props.history.push("/results/top_players/1"); // If empty search bar
                return false;
            }
            if (!vs) {
                if (player1.isValid) {
                    this.props.history.push(
                        "/player_profile/" + player1.playerId
                    ); // Player Profile Call
                } else {
                    this.props.history.push("/results/" + player1.name + "/1"); // Search Results One players
                }
            } else {
                if (player2.isValid) {
                    this.props.history.push(
                        "/head2headprofile/" +
                            player1.playerId +
                            "/" +
                            player2.playerId
                    ); // Head 2 Head Profile
                } else {
                    if (player2.name.length === 0) {
                        this.props.history.push(
                            "/player_profile/" + player1.playerId
                        ); // Player Profile Call
                    } else {
                        this.props.history.push(
                            "/head2headresults/" +
                                player1.playerId +
                                "/" +
                                player2.name +
                                "/1"
                        ); // Head 2 Head Results
                    }
                }
            }
        } else if (charCode === 8) {
            // <<<<<<<<<<<<<<<<<<<<<<<<<< Backspace
            if (player1.name.length === 0) {
                return false;
            }
            if (vs === false) {
                player1.name = player1.name.substr(0, player1.name.length - 1);
                if (player1.name.length > 0) {
                    this.autocomplete(player1);
                } else {
                    this.setState({
                        player1,
                        complete: "",
                        currentIndex: 0,
                        autocomCards: []
                    });
                }
            } else if (vsSpace === " ") {
                this.setState({ vsSpace: "" });
            } else {
                if (player2.name.length === 0) {
                    this.setState({ vs: false});
                } else {
                    player2.name = player2.name.substr(
                        0,
                        player2.name.length - 1
                    );
                    if (player2.name.length > 0) {
                        this.autocomplete(player2);
                    } else {
                        this.setState({
                            player2,
                            complete: "",
                            currentIndex: 0,
                            autocomCards: []
                        });
                    }
                }
            }
        } else {
            return false;
        }

        return false;
    }

    tabComplete(cards, player, index) {
        if (index < 0) {
            index = cards.length - 1;
        }
        if (index >= cards.length) {
            index = 0;
        }
        player.name = cards[index].tag;
        player.playerId = cards[index].id;
        if (player.id === 1) {
            this.setState({
                player1: player,
                currentIndex: index,
                complete: ""
            });
        } else {
            this.setState({
                player2: player,
                currentIndex: index,
                complete: ""
            });
        }
    }

    autocomplete(player) {
        axios
            .post("/autocomplete", {
                input: player.name,
                pageNum: 1,
                resultsPerPage: 10
            })
            .then(response => {
                // Check for valid player name
                for (var i = 0; i < response.data.players.length; i++) {
                    if (
                        response.data.players[i].tag.toLowerCase() ===
                        player.name.toLowerCase()
                    ) {
                        player.isValid = true;
                        player.playerId = response.data.players[i].id;
                        player.name = response.data.players[i].tag;
                        break;
                    }
                }
                if (i === response.data.players.length) {
                    player.isValid = false;
                }

                let autocom = "";
                if (player.isValid && player.id === 1) {
                    autocom = " vs ";
                } else {
                    if (response.data.players[0]) {
                        autocom = response.data.players[0].tag.substr(
                            player.name.length
                        );
                    }
                }

                if (player.name.length === 0) {
                    autocom = "";
                }

                if (player.id === 1) {
                    this.setState({
                        player1: player,
                        autocomCards: response.data.players,
                        complete: autocom
                    });
                } else {
                    this.setState({
                        player2: player,
                        autocomCards: response.data.players,
                        complete: autocom
                    });
                }
            });
    }

    searchClicked() {
        const { player1, player2, vs } = this.state;
        console.log("Enter Pressed");
        if (player1.name.length === 0) {
            this.props.history.push("/results/top_players/1"); // If empty search bar
            return false;
        }
        if (!vs) {
            if (player1.isValid) {
                this.props.history.push("/player_profile/" + player1.playerId); // Player Profile Call
            } else {
                this.props.history.push("/results/" + player1.name + "/1"); // Search Results One players
            }
        } else {
            if (player2.isValid) {
                this.props.history.push(
                    "/head2headprofile/" +
                        player1.playerId +
                        "/" +
                        player2.playerId
                ); // Head 2 Head Profile
            } else {

                if(player2.name.length === 0) {
                    this.props.history.push('/head2headresults/'+player1.playerId+'/top_h2h/1'); // Head 2 Head Results


                } else {
                    this.props.history.push(
                        "/head2headresults/" +
                            player1.playerId +
                            "/" +
                            player2.name +
                            "/1"
                    ); // Head 2 Head Results
                }
            }
        }
    }

    handleAndroid() {
        if(this.android){
            let x = this.searchInput.value;
            let c = 0;
            if(!x){
                c = 8
            } else {
                c = x.charCodeAt(0);
                if(c >= 97 && c <= 122){
                    c = c - 32;
                }
            }
            this.searchInput.value = '';
            this.setState({
                nothing: 'nothing'
            });
            this.handleChange({
                key: x,
                keyCode: c
            });
            this.android = false;
        }
    }

    buildOutput() {
        const { player1, player2, vs, vsSpace, complete } = this.state;

        return (
            <div
                className="searchBar"
                onClick={() => {
                    this.searchInput.focus();
                }}
            >
                <div
                    className={`sbElement ${player1.isValid
                        ? "validName"
                        : "invalidName"}`}
                >
                    {player1.name}
                </div>
                <div className="sbElement">
                    {vsSpace}
                </div>
                {vs
                    ? <div className="sbElement vs"> VS </div>
                    : <div className="sbElement" />}
                {player2.name.length > 0
                    ? <div
                          className={`sbElement ${player2.isValid
                              ? "validName"
                              : "invalidName"}`}
                      >
                          {player2.name}
                      </div>
                    : <div className="sbElement" />}
                <input
                    autoFocus
                    className="inputLine"
                    type="text"
                    onKeyDown={
                        e => this.handleChange(e)
                    }
                    onKeyUp={
                        this.handleAndroid()
                    }
                    ref={ip => {
                        this.searchInput = ip;
                    }}
                />
                <div className="sbElement complete">
                    {complete}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="col-md-6 mx-auto">
                <div className="input-group searchbar-container">
                    {this.buildOutput()}
                    <div
                        className="btn btn-outline-warning"
                        onClick={() => this.searchClicked()}
                    >
                        Search
                    </div>
                    <Autocomplete
                        recommendations={this.state.autocomCards}
                        highlight={this.state.currentIndex}
                    />
                </div>
            </div>
        );
    }
}
