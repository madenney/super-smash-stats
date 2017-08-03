import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Carousel from './playercardcarousel';
import axios from 'axios';
import LandLogo from './imgs/land_logo.png';
import Autocomplete from './autocomplete';
//import _ from 'lodash';

//dynamically create options in datalist with json data

export default class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            autocomCards: [],
            cards: ''
        };
    }
    componentWillMount(){
      axios.post('http://localhost:3030/front_page', {number: 6}).then((response)=>{
        // console.log('this is response: ', response);
        this.setState({
          cards: response.data
        })
      });
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        if (e.target.value != '') {
            axios.post('http://localhost:3030/autocomplete', { input: e.target.value, number: 10 }).then((response) => {
                this.setState({
                    autocomCards: response.data
                });
            })
        } else {
            this.setState({
                autocomCards: []
            })
        }
    }

    handleSubmit(){
      console.log('search props:', this.props);
      // return this.props.getValue(this.state.value);
    }

    render(){
        const { value } = this.state;
        console.log('Value:', value);
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
                      <Link className='btn btn-outline-warning' to={`/results/${value ? value : 'noSearch'}/1`}>Search</Link>
                  </span>

                </div>
              </div>
            </div>
            {/* Row for the player cards styling */}
            <div className='row col-md-6 offset-md-3 col-sm-9 offset-sm-1 scrollmenu'>
              <Carousel card = {this.state.cards} />
            </div>
          </div>
        )
    }
}
