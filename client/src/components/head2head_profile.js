import React, {Component} from 'react';
import axios from 'axios';
class Head2HeadProfile extends Component {
    constructor(props){
      super(props);
      this.state ={
        player1: [],
        player2: []
      }
    }
    componentWillMount(){
      // console.log('this is props: ', this.props)
      const {id1, id2} = this.props.match.params;
      axios.post('http://localhost:3030/player_profile', {input: id1}).then((response)=>{
        console.log('this is the response', response);
        this.setState({
          player1: response.data
        })
      });
      axios.post('http://localhost:3030/player_profile', {input: id2}).then((response)=>{
        this.setState({
          player2: response.data
        })
      })
    }
    render() {
      const {player1, player2} = this.state;
        return (
            <div className='container'>
                <div className='row'>
                  <div className="col-md-5">{player1.tag}</div>
                  <div className="col-md-2">vs.</div>
                  <div className="col-md-5">{player2.tag}</div>
                </div>
            </div>
        )
    }
}

export default Head2HeadProfile;
