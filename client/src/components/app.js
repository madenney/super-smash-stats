import React, {Component} from 'react';
import SearchResults from './search_results';
import {dummy_data} from '../../../data/dummy_data';
class App extends Component{
  constructor(props){
    super(props);
    const {playercards} = dummy_data;
    this.state = {
      player_card: dummy_data.playercards[0]
    }
  }
  //add onClick function that sends to the profile page
  //give each card special onClick function that goes into the profile picture
  render(){
    return(
      <div className='container'>
        <h1>Search Results</h1>
        <SearchBar />
        <Carasoul car_player = {dummy_data.playercards} value='4' />
        <SearchResults player = {this.state.player_card} />
      </div>
    )
  }
}

export default App;