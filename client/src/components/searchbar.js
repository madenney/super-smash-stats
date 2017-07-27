import React, { Component } from 'react';
import {dummy_data} from '../../../data/dummy_data';
import SearchResult from './search_results';

//import axios from 'axios';
import Autocomplete from './autocomplete';

//import _ from 'lodash';

//dynamically create options in datalist with json data

export default class SearchBar extends Component {

    constructor(props){
        const {playercards} = dummy_data;
        super(props);
        this.state = {
            value: '',
            cards: [playercards[0]]
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        console.log(e.target.value);
    }

    handleClick(e) {
        e.preventDefault();
        const {cards} = this.state;
        const {playercards} = dummy_data;
        const result = [];
        for(var i = 0; i < playercards.length; i++){
            if(playercards[i].tag.includes(this.state.value)){
                result.push(playercards[i]);    
            }
        }
        this.setState({
            cards: [...result]
        });


        //  console.log(this.state.cards);


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
                <datalist id="playersRec">
                    <option value="Howard Kim" />
                    <option value="Khanh Nguyen" />
                    <option value="Adam Luong" />
                    <option value="Matt Denney" />
                    <option value="Daniel Paschal" />
                    <option value="Scott Bowler" />
                    <option value="David Sung" />
                </datalist>
                <button className="searchButton" onClick={(e) => this.handleClick(e)}>SEARCH</button>
                <SearchResult card = {this.state.cards} />

                        <Autocomplete recommendations={dummy_data.playercards} />
                <button className="searchButton" onClick={e => this.handleClick(e)}>SEARCH</button>
            </div>
        )
    }
}