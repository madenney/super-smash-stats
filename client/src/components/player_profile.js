import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
      console.log('this is the response david: ', response);
      this.setState({
        profile: response.data[0]
      })
    })
  }
  render(){
    const {profile} = this.state;
    console.log(profile);
    return(
      <div>
        <Link to='/'>Home!</Link>
        <h1>{profile.tag}</h1>
        <p>{profile.name}</p>
        <p>{profile.rank}</p>
        <p>{profile.state}</p>
        <p>{profile.twitter}</p>
        <p>{profile.matches_played}</p>
      </div>
    )
  }
}
export default PlayerProfile;
