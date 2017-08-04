import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import images from './images';
import char_images from './characterimages';
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
      toggle: '',
      button_descrip: 'Maximize',
      description_display: '',
      profile_resizing: ''
    }
  }
  componentWillReceiveProps(nextProps){
    const {id} = nextProps.match.params;
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
  //initial state is at Maximize, or the else statemenet
  toggleDisplay(){
    let {toggle} = this.state;
    if(toggle ===''){
      this.setState({
        toggle: 'toggle',
        button_descrip: 'Minimize',
        description_display: 'hidden',
        profile_picture: 'profile_resizing'
      })
    }
    else{
      this.setState({
        toggle: '',
        button_descrip: 'Maximize',
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
  			      <img className={profile_picture} src={!images[`${profile.tag}.png`] ? ProfilePlaceholder : images[`${profile.tag}.png`] }/>
  					</div>
  					<div className="col-sm-4 col-xs-6">
  						<h2 id="player_tag">{profile.tag}</h2>
              <h4 id='player_rank' className={description_display}>Name: {profile.name}</h4>
  						<h4 id="player_rank" className={description_display}>Rank: {profile.rank}</h4>

  						<p id="location" className={description_display}>Location: {profile.state}</p>
  						<p className={description_display}>Mains:</p>
              <img className={`char_img_sizing ${description_display}`} src={char_images[`${profile.main}.png`]}/>
  						<img className={`char_img_sizing ${description_display}`} src={char_images[`${profile.secondary}.png`]}/>
  						<p className={description_display}>Total Matches Played: {profile.total_matches_played}</p>
  					</div>
  					<div className="col-sm-4 col-xs-6">
  						<p className={description_display}>Nemesis: {profile.nemesis}</p>
  						<p className={description_display}>Twitter: {profile.twitter}</p>
  						<p className={description_display}>Twitch: {profile.twitch}</p>
  						<p className={description_display}>Sponsors: {profile.sponsor}</p>
              <p>Recent Tournaments:</p>
              <div className='recent_tournament' >
                <TournamentHistory tournament_info = {this.state.matches} />
              </div>
            </div>
  				</div>
  			</div>
  		</div>
  		<div className='row'>
  			<div id="matches_stream" className="col-xs-12 col-md-12">
  				<ul className="nav nav-tabs">
  				    <li className='active'>
                <a data-toggle="tab" href='#match_data'>Match Data</a>
              </li>
              <button onClick={(e)=>this.toggleDisplay(e)} type='false' className='btn btn-outline-primary'>{button_descrip}</button>

  				</ul>

          <div className='tab-content col-md-12'>
            <div className={`tab-pane active recent_match container col-md-12 ${toggle}`} id='tournament_data' role='tab-panel'>
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
//  <TournamentHistory tournament_info = {this.state.matches} />
