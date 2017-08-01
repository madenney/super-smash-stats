import React, { Component } from 'react';
import Searchbar from './searchbar';
import axios from 'axios';
import Navbar from './navbar';
import PlayerProfile from './player_profile';
import SearchResults from './search_results';
import {Route, Link} from 'react-router-dom';
import './stylish.css';

export default class Landingpage extends Component {
    constructor(props){
      super(props);
      this.state = {
        player_results : {}
      }
    }
    getResults(value){
      //put all input values as an object
      axios.post('http://localhost:3030/autocomplete', {input: value}).then((response)=>{
        this.setState({
          player_results : response
        })
      })
    }
    render() {
        return (
            <div className="landing">
                <Navbar />
                <Route exact path='/'  render={()=>{
                  return <Searchbar getValue = {(value)=>this.getResults(value)} />
                }} />
                <Route path='/results' render={()=>{
                  return <SearchResults result = {this.state.player_results} />
                }} />
                <Route path='/player_profile/:id' component = {PlayerProfile}/>
            </div>
        )
    }
}
