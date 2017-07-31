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
      axios.post('http://localhost:3030/front_page', {number: 2}).then((response)=>{
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
          <div className ='container center'>
            <div className='landpage_logo row col-md-7 offset-md-5'>
              <img src = {LandLogo}/>
            </div>
            {/*Row for the search bar styling*/}
            <div className='row col-md-6 offset-md-4'>
              <div className='col-md-8'>
                <div className='input-group'>
                  <input className="searchInput" list="playersRec" type="text" placeholder="Insert Player Name" value={this.state.value} onChange={(e) => this.handleChange(e)} />
                  <Autocomplete recommendations={this.state.autocomCards} />
                  <span className='input-group-btn'>
                      <Link type='button' className='btn btn-outline-primary text-center' to='/results' onClick={(e) => this.handleSubmit(e)}>Search</Link>
                  </span>

                </div>
              </div>
            </div>
            {/* Row for the player cards styling */}
            <div className='row col-md-6 offset-md-3'>
              <Carousel card = {this.state.cards} />
            </div>
          </div>
        )
    }
}
