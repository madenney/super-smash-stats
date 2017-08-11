import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import images from './images';
import ProfilePlaceholder from './imgs/ProfilePlaceholder.gif';
import TournamentHistory from './tournament_history';
import MatchHistory from './match_history';
import PlayerChart from './player_charts';
import './player_profile.css';
class PlayerProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      profile : '',
      matches: [],
      //these are the css toggled states that controls the appearance of the maximize and minimize buttons
      toggle: '',
      button_descrip: 'Maximize ^',
      description_display: '',
      profile_resizing: '',
      //these are the states that are for the tournament matches
      tournaments_attended: [],
      tournament_selected: '',
      tournament_matches: []
    }
  }
  //add method that calls the function of the axios calls whenever someone searches on this component
  componentWillReceiveProps(nextProps){
    const {id} = nextProps.match.params;
    axios.post('http://localhost:3030/player_profile', {input: id}).then((response)=>{
      this.setState({
        profile: response.data
      });
      //add loading if this doesn't exist
      axios.post('http://localhost:3030/match_history', {input: this.state.profile.tag}).then((response)=>{
        this.setState({
          matches: response.data
        });
        //takes the matches state and filters pushes the individual tournaments into an array
        for(var i = 0; i < this.state.matches.length; i++){
          all_matches.push(this.state.matches[i].tournament);
        }
        //lodash then filters out the repetitive values of the touranment names
        all_matches = _.uniq(all_matches);
        this.setState({
          tournaments_attended: all_matches
        });
      });
    });
  }
  componentWillMount(){
    const {id} = this.props.match.params;
    let all_matches = [];
    axios.post('http://localhost:3030/player_profile', {input: id}).then((response)=>{
      this.setState({
        profile: response.data,
      });
      axios.post('http://localhost:3030/match_history', {input: this.state.profile.tag}).then((response)=>{
        this.setState({
          matches: response.data,
        });
        //takes the matches state and filters pushes the individual tournaments into an array
        for(var i = 0; i < this.state.matches.length; i++){
          all_matches.push(this.state.matches[i].tournament);
        }
        //lodash then filters out the repetitive values of the touranment names
        all_matches = _.uniq(all_matches);
        this.setState({
          tournaments_attended: all_matches
        });
      });
    });
  }
  //gets value of tournament AND filters out the ones that are equal to have match
  grabTournamentName(e){
    this.setState({
      tournament_selected: e.currentTarget.textContent
    });
    console.log('this is tourney state', this.state.tournament_selected);
    const {matches, tournament_selected} = this.state;
    const all_matches_for_tournament = [];
    for(var i = 0; i < matches.length; i++){
      if(tournament_selected == matches[i].tournament){
        all_matches_for_tournament.push(matches[i]);
      }
    }
    this.setState({
      tournament_matches: all_matches_for_tournament
    });
  }
  //changes the classes for the toggles
  //initial state is at Maximize, or the else statemenet
  toggleDisplay(){
    let {toggle} = this.state;
    if(toggle ===''){
      this.setState({
        toggle: 'toggle',
        button_descrip: 'Minimize v',
        description_display: 'hidden',
        profile_picture: 'profile_resizing'
      })
    }
    else{
      this.setState({
        toggle: '',
        button_descrip: 'Maximize ^',
        description_display: '',
        profile_picture: ''
      })
    }
  }
  render(){
    const {profile, toggle, button_descrip, description_display, profile_picture} = this.state;
    return(
      //general profile picture
      <div className='container'>
        <div className='row'>
  			<div id="profile-card" className="col-xs-12 col-md-12">
  				<div className="row">
  					<div className="col-sm-4 col-xs-6 col-md-4">
  			      <img className={profile_picture} src={!images[`player_pic/${profile.tag}.png`] ? ProfilePlaceholder : images[`player_pic/${profile.tag}.png`] }/>
  					</div>
  					<div className="col-sm-4 col-xs-6">
  						<h2 id="player_tag">{profile.tag}</h2>
              <h4 id='player_rank' className={description_display}>Name: {profile.name}</h4>
  						<h4 id="player_rank" className={description_display}>Rank: {profile.rank}</h4>

  						<p id="location" className={description_display}>Location: {profile.location}</p>
  						<p className={description_display}>Mains:</p>
              <img className={`char_img_sizing ${description_display}`} src={images[`characters/${profile.main}.png`]}/>
  						<img className={`char_img_sizing ${description_display}`} src={images[`characters/${profile.secondary}.png`]}/>
  						<p className={description_display}>Total Matches Played: {profile.total_matches_played}</p>
  					</div>
  					<div className="col-sm-4 col-xs-6">
  						<p className={description_display}>Nemesis: {profile.nemesis}</p>
  						<p className={description_display}>Twitter: {profile.twitter}</p>
  						<p className={description_display}>Twitch: {profile.twitch}</p>
  						<p className={description_display}>Sponsors: {profile.sponsor}</p>
              <p>Recent Tournaments:</p>
              <div className='recent_tournament'>
                <TournamentHistory tournaments_attended = {this.state.tournaments_attended} grab_tourney = {(e)=>this.grabTournamentName(e)}/>
              </div>
            </div>
  				</div>
  			</div>
  		</div>
  		<div className='row'>
  			<div id="matches_stream" className="col-xs-16 col-md-6">
  				<ul className="nav nav-tabs">
  				    <li className='active'>
                <a data-toggle="tab" href='#match_data'>Match Data</a>
              </li>
  				</ul>
          <div className='tab-content col-md-12'>
            <div className={`tab-pane active recent_match container col-md-12 ${toggle}`} id='tournament_data' role='tab-panel'>
              <MatchHistory match_info = {this.state.tournament_matches}/>
            </div>
          </div>
  			</div>
        <div className={`col-md-6 ${toggle}`}>
          <button onClick={(e)=>this.toggleDisplay(e)} type='false' className='btn btn-outline-primary pull-right'>{button_descrip}</button>

          <PlayerChart game_data = {profile} />
        </div>
  		</div>
    </div>
    );
  }
}
export default PlayerProfile;
