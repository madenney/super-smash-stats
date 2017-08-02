import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import images from './images';
import ProfilePlaceholder from './imgs/ProfilePlaceholder.gif';
import TournamentHistory from './tournament_history';
import MatchHistory from './match_history';
import './player_profile.css';
class PlayerProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      profile : '',
      matches: [],
      tournament_history: 'hidden',
      match_history: 'show'
    }
  }
  componentWillMount(){
    const {id} = this.props.match.params;
    axios.post('http://localhost:3030/player_profile', {input: id}).then((response)=>{
      this.setState({
        profile: response.data
      });
      axios.post('http://localhost:3030/match_history', {input: this.state.profile.tag}).then((response)=>{
        this.setState({
          matches: response.data
        });
      });
    });
  }
  //changes the classes for the toggles
  changeClasses(){
    const {tournament_history, match_history} = this.state;
    if(tournament_history == 'hidden'){
      this.setState({
        tournament_history : 'show'
      })
    }
    else{
      this.setState({
        tournament_history : 'hidden'
      })
    }
    if(match_history == 'hidden'){
      this.setState({
        match_history :'show'
      })
    }
    else{
      this.setState({
        match_history : 'hidden'
      });
    }
  }
  render(){
    const {profile} = this.state;
    return(
      <div className='container'>
        <div className="row">
  			<div id="profile-card" className="col-xs-12 col-md-12">
  				<div className="row">
  					<div className="col-sm-4 col-xs-6 col-md-4">
  			      <img src={!images[`${profile.tag}.png`] ? ProfilePlaceholder : images[`${profile.tag}.png`] }/>
  					</div>
  					<div className="col-sm-4 col-xs-6">
  						<h2 id="player_tag">{profile.tag}</h2>
              <h4 id='player_rank'>Name: {profile.name}</h4>
  						<h4 id="player_rank">Rank: {profile.rank}</h4>

  						<p id="location">Location: {profile.state}</p>
  						<p>Main: {profile.main}</p>
  						<p>Secondary: {profile.secondary}</p>
  						<p>Total Matches Played: {profile.total_matches_played}</p>
  					</div>
  					<div className="col-sm-4 col-xs-6">
  						<p>Nemesis: {profile.nemesis}</p>
  						<p>Twitter: {profile.twitter}</p>
  						<p>Twitch: {profile.twitch}</p>
  						<p>Sponsors: {profile.sponsor}</p>
  					</div>
  				</div>
  			</div>
  		</div>
  		<div className="row">
  			<div id="matches_stream" className="col-xs-12 col-md-12">
  				<ul className="nav nav-tabs">
  				    <li className="active">
                <a data-toggle="tab" href='#match_data'>Tournament Data</a>
              </li>
  				    <li>
                <a data-toggle="tab" href='#tournament_data'>Match Data</a>
              </li>
  				</ul>
          <div className='tab-content'>
            <div className='tab-pane active' id='tournament_data' role='tab-panel'>
              <TournamentHistory tournament_info = {this.state.matches} />
            </div>
            <div className='tab-pane fade' id='match_data' role='tab-panel'>
              <MatchHistory match_info = {this.state.matches}/>
            </div>
          </div>
  			</div>
  		</div>
    </div>
    );
  }
}
export default PlayerProfile;
