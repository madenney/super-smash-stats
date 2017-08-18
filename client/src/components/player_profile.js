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
      tournament_matches: [],
      //state for the yt url based on the button clicks
      yt_url: '',
      //sets the states for the individual nav link tabs
      match_active: 'active',
      yt_active: ''
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
          //takes the matches state and filters pushes the individual tournaments into an array
          let tournaments = [];
          for(var i = 0; i < response.data.length; i++){
              tournaments.push(response.data[i].tournament);
          }
          //lodash then filters out the repetitive values of the tournament names
          tournaments = _.uniq(tournaments);

          this.setState({
              matches: response.data,
              tournaments_attended: tournaments
          });
      });
    });
  }
  componentWillMount(){
      const {id} = this.props.match.params;
      axios.post('http://localhost:3030/player_profile', {input: id}).then((response)=>{
          this.setState({
              profile: response.data
          });
          //add loading if this doesn't exist
          axios.post('http://localhost:3030/match_history', {input: this.state.profile.tag}).then((response)=>{
              //takes the matches state and filters pushes the individual tournaments into an array
              let tournaments = [];
              for(var i = 0; i < response.data.length; i++){
                  tournaments.push(response.data[i].tournament);
              }
              //lodash then filters out the repetitive values of the tournament names
              tournaments = _.uniq(tournaments);
              const tournament_selected = tournaments[0];
              const all_matches_for_tournament = [];
              for(var i = 0 ; i < response.data.length ; i++){
                if(tournament_selected === response.data[i].tournament){
                  all_matches_for_tournament.push(response.data[i]);
                }
              }
              this.setState({
                  matches: response.data,
                  tournaments_attended: tournaments,
                  tournament_matches: all_matches_for_tournament
              });
          });
      });
  }
  //gets value of tournament AND filters out the ones that are equal to have match
  grabTournamentName(e){
    const tournament_selected =  e.currentTarget.textContent;
    // console.log('this is tourney state', tournament_selected);
    const {matches} = this.state;
    // console.log('this is the matches: ', matches);
    const all_matches_for_tournament = [];
    for(var i = 0; i < matches.length; i++){
      if(tournament_selected === matches[i].tournament){
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

  getImage(tag) {
      let imagesKeys = Object.keys(images);
      let imageUrl = images['ProfilePlaceholder.gif'];
      if(!tag) {return imageUrl;}
      for(let i = 0; i < imagesKeys.length; i++) {
          if(imagesKeys[i].toLowerCase() === `player_pic/${tag.toLowerCase()}.png`) {
              imageUrl = images[imagesKeys[i]];
              break;
          }
      }
      return imageUrl;
  }
  //gets youtube url from img src
  getYtUrl(e){
    const {match_active, yt_active} = this.state;
    if (match_active == 'active'){
      this.setState({
        match_active: '',
        yt_active: 'active'
      });
    }
    else{
      this.setState({
        match_active: 'active',
        yt_active: ''
      })
    }
    this.setState({
      yt_url: e.target.getAttribute('data')
    })
  }
  render(){
    const {profile, toggle, button_descrip, description_display, profile_picture, match_active, yt_active} = this.state;
    return(
      //general profile picture
      <div className='container'>
        <div className='row'>
  			<div id="profile-card" className="col-xs-12 col-md-12">
  				<div className="row">
  					<div className="col-sm-4 col-xs-6 col-md-4">
  			      <img className={profile_picture} src={this.getImage(profile.tag)}/>
  					</div>
  					<div className="col-sm-4 col-xs-6">
  						<h2 id="player_tag">{profile.tag}</h2>
              <h4 id='player_rank' className={description_display}>Name: {profile.name}</h4>
  						<h4 id="player_rank" className={description_display}>ELO Rank: {profile.rank}</h4>
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
  				<ul className="nav nav-tabs" role='tablist'>
  				    <li className='nav-item'>
                        <a className='nav-link active' data-toggle="tab" href='#tournament_data' role='tab'>Match Data</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' data-toggle='tab' href='#youtube_url' role='tab'>YT Video</a>
                    </li>
  				</ul>
          <div className='tab-content col-md-12'>
            <div className={`tab-pane ${match_active} recent_match container col-md-12 ${toggle}`} id='tournament_data' role='tab-panel'>
              <MatchHistory youtube_url_info = {(e)=>this.getYtUrl(e)} match_info = {this.state.tournament_matches} player_name = {profile.tag}/>
            </div>
            <div className={`tab-pane col-md-12 ${yt_active}`} id='youtube_url' role='tab-panel'>
              <iframe width='500px' height='500px' src={`${this.state.yt_url}?autoplayer=0`}></iframe>
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
