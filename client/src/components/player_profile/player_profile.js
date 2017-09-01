import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import images from '../features/img_filter';
import ProfilePlaceholder from '../imgs/ProfilePlaceholder.gif';
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
      //these are the states that are for the tournament matches
      tournaments_attended: [],
      tournament_matches: [],
      //state for the yt url based on the button clicks
      yt_url: '',
      //sets the states for the individual nav link tabs
      match_active: '',
      yt_active: 'hidden'
    }
  }
  //add method that calls the function of the axios calls whenever someone searches on this component
  componentWillReceiveProps(nextProps){

    const {id} = nextProps.match.params;
    axios.post('/player_profile', {input: id}).then((response)=>{
      this.setState({
        profile: response.data
      });
      //add loading if this doesn't exist
      axios.post('/match_history', {input: this.state.profile.tag}).then((response)=>{
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
      axios.post('/player_profile', {input: id}).then((response)=>{
          this.setState({
              profile: response.data
          });
          //add loading if this doesn't exist
          axios.post('/match_history', {input: this.state.profile.tag}).then((response)=>{
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
              var reverse_matches = all_matches_for_tournament.reverse();
              this.setState({
                  matches: response.data,
                  tournaments_attended: tournaments,
                  tournament_matches: reverse_matches
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
    var reverse_matches = all_matches_for_tournament.reverse();
    this.setState({
      tournament_matches: reverse_matches
    });
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
    if (match_active == 'hidden'){
      this.setState({
        match_active: '',
        yt_active: 'hidden'
      });
    }
    else{
      this.setState({
        match_active: 'hidden',
        yt_active: ''
      })
    }
    if(!e){
      console.log('event is not there no worries!');
    }
    else{
      this.setState({
        yt_url: e.target.getAttribute('data')
      });
    }
  }
  render(){
    const {profile, toggle, button_description, profile_picture, match_active, yt_active, tournament_matches} = this.state;
    if(tournament_matches.length == 0){
      return(
        <h1>Loading</h1>
      )
    }
    console.log('this is the tiournament state: ', tournament_matches[0]);
    return(
      //general profile picture
      <div className='container player_information'>
        <div className='row'>
  			<div id="profile-card" className="col-xs-12 col-md-12">
  				<div className="row">
  					<div className="col-sm-10 col-xs-6 col-md-8 col-lg-4">
  			      <img className={`${profile_picture} player_image`} src={this.getImage(profile.tag)}/>
  					</div>
  					<div className="col-sm-4 col-md-6 col-xs-6 col-lg-4 ">
  						<h2 id="player_tag">{profile.tag}</h2>
              <h4 id='player_rank' >Name: {profile.name}</h4>
  						<h4 id="player_rank" >ELO Rank: {profile.rank}</h4>
  						<p id="location" >Location: {profile.location}</p>
  						<p>Mains:</p>
              <img className='char_img_sizing' src={images[`characters/${profile.main}.png`]}/>
  						<img className='char_img_sizing' src={images[`characters/${profile.secondary}.png`] ? images[`characters/${profile.secondary}.png`] : images['no_character.png']}/>
  						<p>Total Matches Played: {profile.total_matches_played}</p>
  					</div>
  					<div className="col-sm-4 col-md-6 col-xs-6 col-lg-4">
  						<p>Twitter:
  						    <a target='_blank' href={`http:\/\/www.twitter.com\/${profile.twitter}`}> {profile.twitter}</a></p>
  						<p>Twitch:
                            <a target='_blank' href={`http:\/\/www.twitch.tv\/${profile.twitch}`}> {profile.twitch}</a></p>
  						<p>Sponsors: {profile.sponsor}</p>
              <p className='recent_tournament_tag'>Recent Tournaments:</p>
              <div className='recent_tournament'>
                <TournamentHistory tournaments_attended = {this.state.tournaments_attended} grab_tourney = {(e)=>this.grabTournamentName(e)}/>
              </div>
            </div>
  				</div>
  			</div>
  		</div>
  		<div className='row'>
  			<div id="matches_stream" className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
          <div className='col-md-12'>
            <div className={`${match_active} recent_match col-xs-12 col-md-12 col-md-12`} id='tournament_data' >
              <h3>{tournament_matches[0].tournament}</h3>
              <MatchHistory youtube_url_info = {(e)=>this.getYtUrl(e)} match_info = {this.state.tournament_matches} player_name = {profile.tag}/>
            </div>
            <div className={`col-md-12 ${yt_active}`}>
              <button className='back_button btn btn-outline-danger' onClick={()=>this.getYtUrl()}>Back</button>
              <iframe frameBorder='0' allowFullScreen='allowfullscreen' width='400px' height='300px' src={`${this.state.yt_url}?autoplay=0`}></iframe>
            </div>
          </div>

  			</div>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6'>
          {/* <button onClick={(e)=>this.toggleDisplay(e)} type='false' className='btn btn-outline-primary pull-right'>{button_descrip}</button> */}
          <PlayerChart game_data = {profile} />
        </div>
  		</div>
    </div>
    );
  }
}
export default PlayerProfile;
