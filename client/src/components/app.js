import React, {Component} from 'react';
import SearchResults from './search_results';
import {dummy_data} from './dummy_data';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      player_card: dummy_data
    }
  }
  //add onClick function that sends to the profile page
  //give each card special onClick function that goes into the profile picture
  render(){
    return(
      <div className='container'>
        <h1>Search Results</h1>
        <SearchResults card = {this.state.player_card} />
      </div>
    )
  }
}

export default App;
