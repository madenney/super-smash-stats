import React, { Component } from 'react';
//import axios from 'axios';
import Autocomplete from './autocomplete';
import {dummy_data} from '../../../data/dummy_data';
//import _ from 'lodash';

//dynamically create options in datalist with json data

export default class Searchbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        console.log(e.target.value)
    }

    handleClick(e) {
        e.preventDefault();
        // axios.post('', ).then(function(result){
        //     console.log(result);
        // }).catch(function(error){
        //     console.log(error);
        // })
    }



    render(){
//        {value} = this.state;
//        const playerSearch = _.debounce(searchInit, 2000, [options={value}]);

        return (
            <div className="searchbar center">
                <input className="searchInput" list="playersRec" type="text" placeholder="Insert Player Name" value={this.state.value} onChange={e => this.handleChange(e)} />
                        <Autocomplete recommendations={dummy_data.playercards} />
                <button className="searchButton" onClick={e => this.handleClick(e)}>SEARCH</button>
            </div>
        )
    }
}
