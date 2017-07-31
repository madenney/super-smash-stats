import React, { Component } from 'react';
import {dummy_data} from '../../../data/dummy_data';
import {Link} from 'react-router-dom';
import Carousel from './playercardcarousel';
import axios from 'axios';
import LandLogo from './imgs/land_logo.png';
import Autocomplete from './autocomplete';
//import _ from 'lodash';

//dynamically create options in datalist with json data

export default class SearchBar extends Component {

    constructor(props){
        const {playercards} = dummy_data;
        super(props);
        this.state = {
            value: '',
            autocomCards: [],
            cards: ''
        };
    }
    componentWillMount(){
      axios.post('http://localhost:3030/front_page', {number: 8}).then((response)=>{
        console.log('this is response: ', response);
        this.setState({
          cards: response.data
        })
      });
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        if (e.target.value != '') {
            axios.post('http://localhost:3030/autocomplete', { input: e.target.value }).then((response) => {
                this.setState({
                    autocomCards: response.data
                });
                console.log('response', this.state)
            })
        } else {
            this.setState({
                autocomCards: []
            })
        }
    }

    handleSubmit(){
      return this.props.getValue(this.state.value);
    }

    render(){
        return (
          <div>
            <div className='landpage_logo row col-md-7 offset-md-5'>
              <img src = {LandLogo}/>
            </div>
            <div className="searchbar center">
                <input className="searchInput" type="text" placeholder="Insert Player Name" value={this.state.value} onChange={(e) => this.handleChange(e)} />
                <Link to='/results'>
                  <button className="searchButton btn" onClick={(e) => this.handleSubmit(e)}>SEARCH</button>
                </Link>
                <Autocomplete recommendations={this.state.autocomCards} />
                <Carousel card = {this.state.cards} />
            </div>
          </div>
        )
    }
}
