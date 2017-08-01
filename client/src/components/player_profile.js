import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import images from './images';
import ProfilePlaceholder from './imgs/ProfilePlaceholder.gif';
import './player_profile.css';
class PlayerProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      profile : ''
    }
  }
  componentWillMount(){
    const {id} = this.props.match.params;
    axios.post('http://localhost:3030/player_profile', {input: id}).then((response)=>{
      this.setState({
        profile: response.data
      })
    })
  }
  render(){
    const {profile} = this.state;
    console.log(profile);
    return(
      <div className='container'>
        <div className="row">
  			<div id="profile-card" className="col-xs-12 col-md-12">
  				<div className="row">
  					<div className="col-sm-4 col-xs-6">
  						<img className="profile-image" src="images/howard_pro_player.png" />
  					</div>
  					<div className="col-sm-4 col-xs-6">
  						<h3 id="player_tag">{profile.tag}</h3>
              <h4 id='player_rank'>Name: {profile.name}</h4>
  						<h4 id="player_rank">Rank: {profile.rank}</h4>

  						<p id="location">Location: {profile.state}</p>
  						<p>Main: </p>
  							<p id="main_char_played">{profile.main}</p>
  						<p>Secondary: </p>
  							<p id="secondary_char_played">{profile.secondary}</p>
  						<p>Total Matches Played: </p>
  							<p id="losses">{profile.total_matches_played}</p>
  					</div>
  					<div className="col-sm-4 col-xs-6">
  						<p>Nemesis:</p><p id="nemesis">///////</p>
  						<p>Twitter:</p><p id="twitter_link">//////</p>
  						<p>Twitch:</p><p id="twitch_link">///////</p>
  						<p>Sponsors:</p><p id="sponsor">///////</p>
  					</div>
  				</div>
  			</div>
  		</div>
  		<div className="row">
  			<div id="matches_stream" className="col-xs-12 col-md-12">
  				<ul className="nav nav-tabs">
  				    <li className="active"><a data-toggle="tab" href="#match_data">Match Data</a></li>
  				    <li><a data-toggle="tab" href="#tournament_data">Tournament Data</a></li>
  				</ul>
  			  <div className="tab-content">
  				  <div className="tab-pane fade in active" id="match_data">
  					  <div className="col-xs-6">
  						  <h4>Matches VS.</h4>
  						  <p>Top 100: &nbsp</p><p id="matches_vs_top100" className="value">12</p>
  						  <p>Top 25: &nbsp</p><p id="matches_vs_top25" className="value">13</p>
  						  <p>Top 6: &nbsp</p><p id="matches_vs_top6" className="value">15</p>
  					  </div>
  					  <div className="col-xs-6">
  						  <h4>Wins VS.</h4>
  						  <p>Top 100: &nbsp</p><p id="wins_vs_top100" className="value">12</p>
  						  <p>Top 25: &nbsp</p><p id="wins_vs_top25" className="value">5</p>
  						  <p>Top 6: &nbsp</p><p id="wins_vs_top6" className="value">666</p>
  					  </div>
  				  </div>
  				  <div className="tab-pane fade" id="tournament_data">
  					  <div className="col-xs-12">TournIES!</div>
  				  </div>
  			    </div>
  			  </div>
  			</div>
  		</div>
    );
  }
}
export default PlayerProfile;
//        <img src={!images[`${profile.tag}.png`] ? ProfilePlaceholder : images[`${profile.tag}.png`] }/>
