import React, {Component} from 'react';
import axios from 'axios';
import Carousel from './playercardcarousel';
import {Link} from 'react-router-dom';
import './stylish.css';
//will most likely need to be a class component,

class SearchResults extends Component{
  constructor(props){
    super(props);
    this.state = {
      player_cards:[]
    }
  }

  componentWillMount(){
    var { search } = this.props.match.params;
    console.log('Search is:', search);
    if(search == 'noSearch'){
      console.log('No search given');
      search = '';
    }
    axios.post('http://localhost:3030/autocomplete', {input: search, number: 20}).then((response)=>{
      this.setState({
        player_cards : response.data
      })
    })
  }
  render(){
    if(!this.state.player_cards){
      return <h1>Loading...</h1>
    }

    console.log('The state is...', this.state.player_cards)
    return(
      <div className='container search_results'>
        <div className='col-md-11 offset-md-1 '>
          <Carousel card = {this.state.player_cards} />
        </div>
      </div>
    )
  }
}

export default SearchResults;
