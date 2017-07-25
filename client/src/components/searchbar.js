import React, { Component } from 'react';
import axios from 'axios';
import '../../../data/matches_1529.json';

//dynamically create options in datalist with json data

export default class Searchbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            placeholder: 'Find a Player',
            value: ''
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        console.log(e.target.value)
    }

    handleClick(e) {
        e.preventDefault();
        axios.get('').then(function(result){
            console.log(result);
        })
    }



    render(){

        return (
            <div className="searchbar">
                <input className="searchInput center" list="playersRec" type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={e => this.handleChange(e)} />
                <datalist id="playersRec">
                    <option value="Howard Kim" />
                    <option value="Khanh Nguyen" />
                    <option value="Adam Luong" />
                    <option value="Matt Denney" />
                    <option value="Daniel Paschal" />
                    <option value="Scott Bowler" />
                    <option value="David Sung" />
                </datalist>
                <button onClick={e => this.handleClick(e)}>SEARCH</button>
            </div>
        )
    }
}
