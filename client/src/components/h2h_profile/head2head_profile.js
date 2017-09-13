import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getH2HProfiles } from "../../actions";

import images from "../features/img_filter";
import ProfilePlaceholder from "../imgs/ProfilePlaceholder.gif";
import H2HMatchHistory from "./h2hmatches";
import H2HPlayerChart from "./h2hplayer_charts";
import "../css/h2h.css";

class Head2HeadProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allYearlyHistory: [],
      match_active: "",
      yt_active: "hidden"
    };
  }

  componentDidMount() {
    const { id1, id2 } = this.props.match.params;
    this.props.getH2HProfiles(id1, id2);
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
    console.log("this.props after h2hprofiles", this.props.results);

    if (!this.props.results) {
      return <h1>Loading...</h1>;
    }

    const {
      player1,
      player2,
      p1Wins,
      p2Wins,
      yearlyHistory,
      matches
    } = this.props.results;

    if (matches.length == 0) {
      return (
        <div className="container">
          <h1>
            {player1.tag} VERSUS {player2.tag}
          </h1>
          <h2 className="text-center">Does Not Have Matches With Each Other!</h2>
        </div>
      );
    } else {
      const { match_active, yt_active } = this.state;
      const { id1, id2 } = this.props.match.params;
      return (
        <div className="container-fluid">
          {/* Player1 Profile Information */}
          <div className="row mt-5">
            <div className="col-5">
              <div className="row col-6">
                <Link className="col-6 offset-3" to={`/player_profile/${id1}`}>
                  <img
                    className="player-image"
                    src={
                      images[`player_pic/${player1.tag}.png`] ? (
                        images[`player_pic/${player1.tag}.png`]
                      ) : (
                        ProfilePlaceholder
                      )
                    }
                  />
                </Link>
                <div className="col-12">
                  <h2 className="player-info">{player1.tag}</h2>
                  <h4 className="player-info">
                    Location: {player1.location}
                  </h4>
                  <p className="player-info">Main: </p>
                  <div className="row">
                    <img
                      className="player-characters col-4"
                      src={images[`characters/${player1.main}.png`]}
                    />
                    <img
                      className="player-characters col-4"
                      src={
                        images[`characters/${player1.secondary}.png`] ? (
                          images[`characters/${player1.secondary}.png`]
                        ) : (
                          images["no_character.png"]
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          {/*versus column bar*/}
            <div className="col-2">
              <h1 className="h2h-info-label">VERSUS</h1>
              <h3 className="h2h-info-label">Set Count 2017</h3>
              <h2 className="h2h-info-label">
                {yearlyHistory[0].p1Wins} - {yearlyHistory[0].p2Wins}
              </h2>
            </div>
            {/* Player 2 Profile Information */}
            <div className="col-5">
              <div className="row col-6">
                <Link className="col-6 offset-3" to={`/player_profile/${id2}`}>
                  <img
                    className="player-image"
                    src={
                      images[`player_pic/${player2.tag}.png`] ? (
                        images[`player_pic/${player2.tag}.png`]
                      ) : (
                        ProfilePlaceholder
                      )
                    }
                  />
                </Link>
                <div className="col-12">
                  <h2 className="player-info">{player2.tag}</h2>
                  <h4 className="player-info">
                    Location: {player2.location}
                  </h4>
                  <p className="player-info">Main: </p>
                  <div className="row">
                    <img
                      className="player-characters col-4"
                      src={images[`characters/${player2.main}.png`]}
                    />
                    <img
                      className="player-characters col-4"
                      src={
                        images[`characters/${player2.secondary}.png`] ? (
                          images[`characters/${player2.secondary}.png`]
                        ) : (
                          images["no_character.png"]
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Match History For Players */}
          <div className="row mt-5">
            <div className="col-6 player-tournament">
              <div className="col-md-12">
                <div
                  className={`${match_active} h2h-recent-match`}
                >
                  <h3>Tournament Details</h3>
                  <H2HMatchHistory
                    youtube_url_info={e => this.getYtUrl(e)}
                    matches={matches}
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
            <div className="col-6">
              <H2HPlayerChart
                game_data={yearlyHistory}
                player1={player1}
                player2={player2}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    results: state.h2h_results.profiles_results
  };
}

export default connect(mapStateToProps, { getH2HProfiles })(Head2HeadProfile);
