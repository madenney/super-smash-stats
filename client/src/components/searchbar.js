import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Carousel from './playercardcarousel';
import axios from 'axios';
import './search_bar.css';
import Input from './input';
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
            cards: '',
            placeholder: '',
            text_filled: ''
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
            axios.post('http://localhost:3030/autocomplete', { input: e.target.value, pageNum: 1, resultsPerPage: 10 }).then((response) => {
                this.setState({
                    autocomCards: response.data.players,
                    placeholder: response.data.players[0].tag
                });
            })
        } else {
            this.setState({
                autocomCards: [],
                placeholder: ''
            })
        }
    }
    handleKeyInputs(e){
      console.log('this is the key that was pressed:',e.keyCode);
      if(e.keyCode == 32){
        console.log('space bar was pressed');
      }
      else if(e.keyCode == 9){
        e.preventDefault();
        console.log('tab was pressed');
      }
      else if(e.keyCode == 13){
        console.log('enter was pressed');
      }
      else if(e.keyCode == 16){
        console.log('shift key was pressed');
      }
      else if(e.keyCode>=48 && e.keyCode <= 90){
        this.setState({
          text_filled: this.state.text_filled + e.key
        });
      }
      else{
        console.log('das not a letter silly!');
      }

      // console.log('this is the key: ', e.key);
    }
    render(){
        const { value } = this.state;
        // console.log('Value:', this.state.autocomCards);
        return (
          <div className ='container center'>
            <div className='landpage_logo row offset-md-4 col-md-6 off-lg-4'>
              <img src = {LandLogo}/>
            </div>
            {/*Row for the search bar styling*/}
            <div className='row col-md-6 offset-md-4 col-xs-12 col-sm-12'>
              <div className='col-md-8'>
                <div className='input-group'>
                  {/* This is the Refined Search Bar Code */}
                  <div className='input-group editable' data-placeholder={this.state.placeholder}>
                    <Input />
                    <div className='completed_text'>{this.state.text_filled}</div>
                    <input onKeyDown = {(e)=>this.handleKeyInputs(e)} className="form-control" type="text" placeholder="Insert Player Name" value={this.state.value} onChange={(e) => this.handleChange(e)} />

                  </div>
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
