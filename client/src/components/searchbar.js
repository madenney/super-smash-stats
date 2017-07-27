import React, { Component } from 'react';
import {dummy_data} from '../../../data/dummy_data';
import {Link} from 'react-router-dom';
import Carousel from './playercardcarousel';
import axios from 'axios';
import Autocomplete from './autocomplete';

//import _ from 'lodash';

//dynamically create options in datalist with json data

export default class SearchBar extends Component {

    constructor(props){
        const {playercards} = dummy_data;
        super(props);
        this.state = {
            value: '',
            cards: ''
        };
    }
    componentWillMount(){
      axios.post('http://localhost:3030/front_page').then((response)=>{
        // console.log('this is response: ', response);
        this.setState({
          cards: response.data
        })
      });
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }
    handleSubmit(e) {
      return this.props.getValue(this.state.value);
    }
    render(){
        return (
            <div className="searchbar center">
                <input className="searchInput" list="playersRec" type="text" placeholder="Insert Player Name" value={this.state.value} onChange={(e) => this.handleChange(e)} />
                <Autocomplete recommendations={dummy_data.playercards} />
                <Link to='/results'>
                  <button className="searchButton" onClick={(e) => this.handleSubmit(e)}>SEARCH</button>
                </Link>
                <Carousel card = {this.state.cards} />
            </div>
        )
    }
}
