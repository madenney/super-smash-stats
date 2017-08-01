import React, { Component } from 'react';
import Searchbar from './searchbar';
import axios from 'axios';
import Navbar from './navbar';
import PlayerProfile from './player_profile';
import SearchResults from './search_results';
import {Route, Link} from 'react-router-dom';
import './stylish.css';

export default class Landingpage extends Component {
    render() {
        return (
            <div className="landing">
              <Searchbar getValue = {(value)=>this.getResults(value)} />
            </div>
        )
    }
}
