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
      chart_active: "",
      yt_active: "hidden",
      yt_url: ''
    };
  }

  componentDidMount() {
    const { id1, id2 } = this.props.match.params;
    this.props.getH2HProfiles(id1, id2);
  }

  getYtUrl(e) {
    const { chart_active, yt_active } = this.state;
    if (yt_active == "hidden") {
      this.setState({
        chart_active: "hidden",
        yt_active: "",
        yt_url: e.target.getAttribute("data")
      });
    } else {
      this.setState({
        chart_active: "",
        yt_active: "hidden",
        yt_url: ''
      });
    }
  }

  render() {
    let yt_video;
    if(this.state.yt_url === ''){
      yt_video = <h1>No Video</h1>
    }
    else{
      yt_video = <iframe
        allowFullScreen="allowfullscreen"
        width="400px"
        height="300px"
        frameBorder='0'
        src={`${this.state.yt_url}?autoplayer=0`}
      />
    }
    if (!this.props.results) {
      return <h1 className="container">Loading...</h1>;
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
          <h2 className="text-center">
            Does Not Have Matches With Each Other!
          </h2>
        </div>
      );
    } else {
      const { chart_active, yt_active } = this.state;
      const { id1, id2 } = this.props.match.params;
      return (
        <div className="container-fluid">
          <div className="row mb-5">
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
            <div className="col-12 col-md-6 mt-3 player-tournament">
              <div className="col-12">
                <div className='h2h-recent-match'>
                  <h3>Match History</h3>
                  <H2HMatchHistory
                    youtube_url_info={e => this.getYtUrl(e)}
                    matches={matches}
                  />
                </div>
              </div>
            </div>
            <div className={`${chart_active} col-xs-12 col-md-6 my-5 chart-display`}>
              <H2HPlayerChart
                game_data={yearlyHistory}
                player1={player1}
                player2={player2}
              />
            </div>
            <div className={`col-md-6 ${yt_active}`}>
              <button
                className="back_button btn btn-outline-danger"
                onClick={() => this.getYtUrl()}>
                X
              </button>
              {yt_video}
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
