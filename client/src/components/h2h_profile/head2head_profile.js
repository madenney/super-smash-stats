import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getH2HProfiles } from "../../actions";

import images from "../features/img_filter";
import ProfilePlaceholder from "../imgs/ProfilePlaceholder.gif";
import H2HMatchHistory from "./h2hmatches";
import H2HPlayerChart from "./h2hplayer_charts";
import ProfileCard from "./h2h_profile_card";
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
      return <h1 className="mt-5">Loading...</h1>;
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
        <div className="container mt-5">
          <h1>
            {player1.tag} VERSUS {player2.tag}
          </h1>
          <h2 className="text-center">
            Does Not Have Matches With Each Other!
          </h2>
        </div>
      );
    } else {
      const { match_active, yt_active } = this.state;
      const { id1, id2 } = this.props.match.params;
      return (
        <div className="container-fluid">
          <div className="row my-5">
            {/* Player1 Profile Information */}
            <ProfileCard
              id={id1}
              tag={player1.tag}
              main={player1.main}
              secondary={player1.secondary}
              location={player1.location}
            />
            {/*versus column bar*/}
            <div className="col-md-2 my-5">
              <h1 className="h2h-info-label">VERSUS</h1>
              <h3 className="h2h-info-label">Set Count 2017</h3>
              <h2 className="h2h-info-label">
                {yearlyHistory[0].p1Wins} - {yearlyHistory[0].p2Wins}
              </h2>
            </div>
            {/* Player 2 Profile Information */}
            <ProfileCard
              id={id2}
              tag={player2.tag}
              main={player2.main}
              secondary={player2.secondary}
              location={player2.location}
              flip={true}
            />
          </div>
          {/* Match History For Players */}
          <div className="row">
            <div className="col-12 col-md-6 my-5 player-tournament">
              <div className="col-12">
                <div className={`${match_active} h2h-recent-match`}>
                  <h3>Match History</h3>
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
            <div className="col-xs-12 col-md-6 my-5 chart-display">
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
