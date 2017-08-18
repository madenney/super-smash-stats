import React, {Component} from 'react';
import images from './images';
import {Link} from 'react-router-dom';
import ProfilePlaceholder from './imgs/ProfilePlaceholder.gif'
import axios from 'axios';
import H2HMatchHistory from './h2hmatches';
import H2HPlayerChart from './h2hplayer_charts';
import './h2h.css';
class Head2HeadProfile extends Component {
    constructor(props){
      super(props);
      this.state ={
        player1: [],
        player1wins: '',
        player2: [],
        player2wins: '',
        yearlyHistory: [],
        matches: [],
        allYearlyHistory: []
      }
    }
    componentWillMount(){
      // console.log('this is props: ', this.props)
      const {id1, id2} = this.props.match.params;
      axios.post('http://localhost:3030/head2headprofile', {id1 : id1, id2 : id2}).then((response)=>{
        console.log('this is the response', response);
        this.setState({
          player1: response.data.player1,
          player1wins: response.data.p1Wins,
          player2: response.data.player2,
          player2wins: response.data.p2Wins,
          yearlyHistory: response.data.yearlyHistory[0],
          matches: response.data.matches,
          allYearlyHistory: response.data.yearlyHistory
        })
      });
    }
    render() {
      const {player1, player2, player1wins, player2wins, yearlyHistory} = this.state;
      console.log('yearlyHistory', yearlyHistory);
      if(!player1 || !player2){
        return(
          <h1>Loading...</h1>
        )
      }
        return (
            <div className='container'>
              {/* Player1 Profile Information */}
                <div className='row'>
                  <div className="col-md-5 player_box">
                    <div className='row'>
                      <img className='col-md-6' src = {images[`player_pic/${player1.tag}.png`] ? images[`player_pic/${player1.tag}.png`] : ProfilePlaceholder} />
                      <div className='col-md-6'>
                        <h2 className='h2hplayer_text'>{player1.tag}</h2>
                        <h4 className='h2hplayer_text'>Location: {player1.location}</h4>
                        <p className='h2hinfo'>Main: </p>
                        <img className='h2hcharacter' src={images[`characters/${player1.main}.png`]}/>
                        <img className='h2hcharacter' src={images[`characters/${player1.secondary}.png`]}/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <h1 className='h2hinfo'>VERSUS</h1>
                    <h3 className='h2hsetcounttitle'>Set Count 2017</h3>
                    <h2 className='h2hsetcount'>{yearlyHistory.p1Wins} - {yearlyHistory.p2Wins}</h2>
                  </div>
                  {/* Player 2 Profile Information */}
                    <div className="col-md-5 player_box">
                      <div className='row'>
                        <img className='col-md-6' src = {images[`player_pic/${player2.tag}.png`] ? images[`player_pic/${player2.tag}.png`] : ProfilePlaceholder} />
                        <div className='col-md-6'>
                          <h2 className='h2hplayer_text'>{player2.tag}</h2>
                          <h4 className='h2hplayer_text'>Location: {player2.location}</h4>
                          <p className='h2hinfo'>Main: </p>
                          <img className='h2hcharacter' src={images[`characters/${player2.main}.png`]}/>
                          <img className='h2hcharacter' src={images[`characters/${player2.secondary}.png`]}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Match History For Players */}
                  <div className='row'>
                    <div className='col-md-6'>
                      <H2HMatchHistory matches = {this.state.matches} />
                    </div>
                    <div className='col-md-6'>
                      <H2HPlayerChart game_data = {this.state.allYearlyHistory} player1 = {this.state.player1} player2 = {this.state.player2} />
                    </div>
                  </div>
            </div>
        )
    }
}

export default Head2HeadProfile;
