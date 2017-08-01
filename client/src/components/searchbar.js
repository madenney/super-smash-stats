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
      axios.post('http://localhost:3030/front_page', {number: 6}).then((response)=>{
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
            <div className='landpage_logo row offset-md-3 col-md-6'>
              <img src = {LandLogo}/>
            </div>
            {/*Row for the search bar styling*/}
            <div className='row col-md-6 offset-md-4 col-xs-12 col-sm-12'>
              <div className='col-md-8'>
                <div className='input-group'>
                  <input className="form-control" type="text" placeholder="Insert Player Name" value={this.state.value} onChange={(e) => this.handleChange(e)} />
                  <Autocomplete recommendations={this.state.autocomCards} />
                  <span className='input-group-btn'>
                      <Link className='btn btn-outline-warning' to='/results' onClick={(e) => this.handleSubmit(e)}>Search</Link>
                  </span>

                </div>
              </div>
            </div>
            {/* Row for the player cards styling */}
            <div className='row col-md-6 offset-md-3 col-sm-9 offset-sm-1'>
              <Carousel card = {this.state.cards} />
            </div>
          </div>
        )
    }
}
