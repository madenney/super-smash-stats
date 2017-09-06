import React, { Component } from "react";
import images from "../features/img_filter";
import { Link } from "react-router-dom";
import ProfilePlaceholder from "../imgs/ProfilePlaceholder.gif";
import axios from "axios";
import H2HMatchHistory from "./h2hmatches";
import H2HPlayerChart from "./h2hplayer_charts";
import "../css/h2h.css";

class Head2HeadProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: [],
      player1wins: "",
      player2: [],
      player2wins: "",
      yearlyHistory: [],
      matches: [],
      allYearlyHistory: [],
      match_active: "",
      yt_active: "hidden"
    };
  }

  componentWillMount() {
    // console.log('this is props: ', this.props)
    const { id1, id2 } = this.props.match.params;
    axios.post("/head2headprofile", { id1: id1, id2: id2 }).then(response => {
      console.log("this is the response", response);
      this.setState({
        player1: response.data.player1,
        player1wins: response.data.p1Wins,
        player2: response.data.player2,
        player2wins: response.data.p2Wins,
        yearlyHistory: response.data.yearlyHistory[0],
        matches: response.data.matches,
        allYearlyHistory: response.data.yearlyHistory
      });
    });
  }

  getYtUrl(e) {
    const { match_active, yt_active } = this.state;
    if (yt_active == "hidden") {
      this.setState({
        match_active: "hidden",
        yt_active: ""
      });
    } else {
      this.setState({
        match_active: "",
        yt_active: "hidden"
      });
    }
    if (!e) {
      console.log("event is not there no worries!");
    } else {
      this.setState({
        yt_url: e.target.getAttribute("data")
      });
    }
  }
  render() {
    const {
      player1,
      player2,
      player1wins,
      player2wins,
      yearlyHistory,
      matches
    } = this.state;
    console.log("yearlyHistory", yearlyHistory);
    if (!player1 || !player2) {
      return <h1>Loading...</h1>;
    } else if (matches.length == 0) {
      return (
        <div className="container">
          <h1>
            {player1.tag} VERSUS {player2.tag}
          </h1>
          <h2 className="center">Does Not Have Matches With Each Other!</h2>
        </div>
      );
    } else {
      const { match_active, yt_active } = this.state;
      const { id1, id2 } = this.props.match.params;
      return (
        <div className="container">
          {/* Player1 Profile Information */}
          <div className="row">
            <div className="col-md-5 player_box">
              <div className="row">
                <Link to={`/player_profile/${id1}`}>
                  <img
                    className="col-md-6"
                    src={
                      images[`player_pic/${player1.tag}.png`]
                        ? images[`player_pic/${player1.tag}.png`]
                        : ProfilePlaceholder
                    }
                  />
                </Link>
                <div className="col-md-6">
                  <h2 className="h2h-player-info">
                    {player1.tag}
                  </h2>
                  <h4 className="h2h-player-info">
                    Location: {player1.location}
                  </h4>
                  <p className="h2h-info-label">Main: </p>
                  <img
                    className="h2h-characters"
                    src={images[`characters/${player1.main}.png`]}
                  />
                  <img
                    className="h2h-characters"
                    src={
                      images[`characters/${player1.secondary}.png`]
                        ? images[`characters/${player1.secondary}.png`]
                        : images["no_character.png"]
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <h1 className="h2h-info-label">VERSUS</h1>
              <h3 className="h2h-set-count-title">Set Count 2017</h3>
              <h2 className="h2h-set-count">
                {yearlyHistory.p1Wins} - {yearlyHistory.p2Wins}
              </h2>
            </div>
            {/* Player 2 Profile Information */}
            <div className="col-md-5 h2h-player-box">
              <div className="row">
                <Link to={`/player_profile/${id2}`}>
                  <img
                    className="col-md-6"
                    src={
                      images[`player_pic/${player2.tag}.png`]
                        ? images[`player_pic/${player2.tag}.png`]
                        : ProfilePlaceholder
                    }
                  />
                </Link>
                <div className="col-md-6">
                  <h2 className="h2h-player-info">
                    {player2.tag}
                  </h2>
                  <h4 className="h2h-player-info">
                    Location: {player2.location}
                  </h4>
                  <p className="h2h-info-label">Main: </p>
                  <img
                    className="h2h-characters"
                    src={images[`characters/${player2.main}.png`]}
                  />
                  <img
                    className="h2h-characters"
                    src={
                      images[`characters/${player2.secondary}.png`]
                        ? images[`characters/${player2.secondary}.png`]
                        : images["no_character.png"]
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Match History For Players */}
          <div className="row">
            <div id="matches_stream" className="col-xs-16 col-md-6">
              <div className="col-md-12">
                <div
                  className={`${match_active} h2h-recent-match col-md-12`}
                  id="tournament_data"
                >
                  <h3>Tournament Details</h3>
                  <H2HMatchHistory
                    youtube_url_info={e => this.getYtUrl(e)}
                    matches={this.state.matches}
                  />
                </div>
                <div className={`col-md-12 ${yt_active}`}>
                  <button
                    className="back_button btn btn-outline-danger"
                    onClick={() => this.getYtUrl()}
                  >
                    Back
                  </button>
                  <iframe
                    allowFullScreen="allowfullscreen"
                    width="400px"
                    height="300px"
                    src={`${this.state.yt_url}?autoplayer=0`}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <H2HPlayerChart
                game_data={this.state.allYearlyHistory}
                player1={this.state.player1}
                player2={this.state.player2}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Head2HeadProfile;
