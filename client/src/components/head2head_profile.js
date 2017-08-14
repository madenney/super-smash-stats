import React, {Component} from 'react';
import images from './images';
import ProfilePlaceholder from './imgs/ProfilePlaceholder.gif'
import './h2h.css';
import axios from 'axios';
class Head2HeadProfile extends Component {
    constructor(props){
      super(props);
      this.state ={
        player1: [],
        player1wins: '',
        player2: [],
        player2wins: ''
      }
    }
    componentWillMount(){
      // console.log('this is props: ', this.props)
      const {id1, id2} = this.props.match.params;
      console.log('khanhsolog id2: ', id2);
      axios.post('http://localhost:3030/head2headprofile', {id1 : id1, id2 : id2}).then((response)=>{
        console.log('this is the response', response);
        this.setState({
          player1: response.data.player1,
          player1wins: response.data.p1Wins,
          player2: response.data.player2,
          player2wins: response.data.p2Wins
        })
      });
    }
    render() {
      const {player1, player2} = this.state;
        return (
            <div className='container'>
                <div className='row'>
                  <div className="col-md-5">
                    <img src = {images[`player_pic/${player1.tag}.png`] ? images[`player_pic/${player1.tag}.png`] : ProfilePlaceholder} />
                    <h1>Tag: {player1.tag}</h1>

                  </div>
                  <div className="col-md-2">vs.</div>
                  <div className="col-md-5">{player2.tag}</div>
                </div>
            </div>
        )
    }
}

export default Head2HeadProfile;
