import React, {Component} from 'react';
import { getPlayerProfile } from '../../actions';
import { filterTournamentMatches } from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import Scroll from "react-scroll";
import { scroller } from "react-scroll";
import {Link} from 'react-router-dom';
import images from '../features/img_filter';
import ProfilePlaceholder from '../imgs/ProfilePlaceholder.gif';
import TournamentHistory from './tournament_history';
import MatchHistory from './match_history';
import PlayerChart from './player_charts';
import './player_profile.css';
let scroll = Scroll.animateScroll;

class PlayerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state for the yt url based on the button clicks
      yt_url: "",
      //sets the states for the individual nav link tabs
      chart_active: "",
      yt_active: "hidden"
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPlayerProfile(id);
  }

  grabTournamentName(e) {
    const tournament_selected = e.currentTarget.value;
    const { matches } = this.props;
    this.props.filterTournamentMatches(tournament_selected, matches);
  }

  getImage(tag) {
    let imagesKeys = Object.keys(images);
    let imageUrl = images["ProfilePlaceholder.gif"];
    if (!tag) {
      return imageUrl;
    }
    for (let i = 0; i < imagesKeys.length; i++) {
      if (
        imagesKeys[i].toLowerCase() === `player_pic/${tag.toLowerCase()}.png`
      ) {
        imageUrl = images[imagesKeys[i]];
        break;
      }
    }
    return imageUrl;
  }

  chartVisible() {
    console.log("chart is now visible!");
    const { chart_active, yt_active } = this.state;
    if (chart_active === "hidden") {
      this.setState({
        chart_active: '',
        yt_active: 'hidden',
        yt_url: ''
      });
    }
  }
  
  getYtUrl(e){
    const {chart_active, yt_active} = this.state;
    scroll.scrollToBottom({
        smooth: true,
        offset: 50,
        isDynamic: true
    });
    if (chart_active == ''){
      this.setState({
        chart_active: "hidden",
        yt_active: ""
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
  
  render(){
    let player_main;
    let player_main_title;
    const { toggle, button_description, profile_picture, chart_active, yt_active} = this.state;
    const {tournament_matches, profile, tournaments_attended, tournament_selected} = this.props;
    if(tournament_matches === undefined){
      return(
        <div className="mt-5">
          <h1>Loading</h1>
        </div>
      );
    }
    const player_picture = this.getImage(profile.tag);
    const pic_bg = {
      backgroundImage: `url(${player_picture})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'

    }
    console.log('profile.secondary: ', profile);
    if(profile.main === undefined ){
      player_main = <p>N/A</p>
    }
    else{
      player_main = <img className='char_img_sizing' src={images[`characters/${profile.main}.png`]}/>

    }
    if(profile.secondary === undefined || profile.secondary == ''){
      player_main_title = <p>Main: </p>
    }
    else{
      player_main_title = <p>Mains: </p>
    }
    // console.log('this is the tiournament state: ', tournament_matches[0]);
    return (
      //general profile picture
      <div className='container'>
  				<div className="row mt-3">
  					<div style={pic_bg} className="col-sm-6 offset-sm-2 col-md-4 col-lg-3 player_image">
						  <h2 className="player_tag">{profile.tag}</h2>
          	</div>
  					<div className="player_info col-sm-4 col-md-6 col-xs-6 col-lg-4 offset-sm-1">

              <h4 id='player_rank' >{profile.name}</h4>
  						{/* <h4 id="player_rank" >ELO Rank: {profile.rank}</h4> */}
  						<p id="location" >Region: {profile.location}</p>
  						{player_main_title}
              {player_main}
  						<img className='char_img_sizing' src={images[`characters/${profile.secondary}.png`] ? images[`characters/${profile.secondary}.png`] : images['no_character.png']}/>
  						<p>Total Matches: {profile.total_matches_played}</p>
  					</div>
  					{/* <div className="player_links col-sm-6 col-md-6 col-xs-6 col-lg-4">
  						<p>Twitter:
  						    <a target='_blank' href={`http:\/\/www.twitter.com\/${profile.twitter}`}> {profile.twitter}</a></p>
  						<p>Twitch:
                  <a target='_blank' href={`http:\/\/www.twitch.tv\/${profile.twitch}`}> {profile.twitch}</a></p>
  						<p>Sponsors: {profile.sponsor}</p>
              <p>Tidbit: This is the place for tidbits!</p>
            </div> */}
  		</div>
      <div className='row my-3'>
        <p className='recent_tournament_tag'>Select Tournament:</p>
        <div className='recent_tournament col-xs-12 col-sm-12 col-md-3 col-lg-3'>
          <TournamentHistory tournaments_attended = {tournaments_attended} grab_tourney = {(e)=>this.grabTournamentName(e)}/>
        </div>
      </div>
  		<div className='row'>
  			<div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
          <div className='col-md-12'>
            {/* <h3 className='tournament-selected'>{tournament_selected}</h3> */}
            <table className='table'>
              <thead>
                <tr className='col-md-4 theader'>
                  <td>Result</td>
                  <td>Opponent</td>
                  <td>Youtube Video</td>
                </tr>
              </thead>
            </table>
            <div className={`recent_match col-xs-12 col-md-12 col-md-12`} id='tournament_data' >
              <MatchHistory youtube_url_info = {(e)=>this.getYtUrl(e)} match_info = {this.props.tournament_matches} player_name = {profile.tag}/>
            </div>

          </div>

  			</div>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6'>
          <div className={`chart-display ${chart_active}`}>
            <PlayerChart game_data = {profile} />
          </div>
          <div className={`${yt_active} col-sm-1 mt-4`}>
            <iframe className='yt-player mx-auto' frameBorder='0' allowFullScreen='allowfullscreen' width='400px' height='300px' src={`${this.state.yt_url}?autoplay=0`}></iframe>
            <button className='back_button btn btn-outline-danger mx-auto' onClick={()=>this.chartVisible()}>X</button>
          </div>
        </div>
  		</div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile.profile,
    matches: state.profile.matches_info.matches,
    tournaments_attended: state.profile.matches_info.tournaments_attended,
    tournament_matches: state.profile.matches_info.tournament_matches,
    tournament_selected: state.profile.matches_info.tournament_selected
  };
}

export default connect(mapStateToProps, {
  getPlayerProfile,
  filterTournamentMatches
})(PlayerProfile);