import React, { Component } from 'react';
import axios from 'axios';
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
        axios.post('', ).then(function(result){
            console.log(result);
        }).catch(function(error){
            console.log(error);
        })
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
                <button className="searchButton" onClick={e => this.handleClick(e)}>SEARCH</button>
            </div>
        )
    }
}
