import React, { Component } from 'react';

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
    }

    handleSubmit(e) {
        e.preventDefault();
    }


    render(){


        return (
            <div id="landing">
                <input className="searchInput center" list="playersRec" type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={e => this.handleChange(e)} />
                <datalist id="playersRec">
                    <option value="Howard Kim" />
                    <option value="Khanh Nguyen" />
                    <option value="Adam Luong" />
                    <option value="Matt Denney" />
                    <option value="Daniel Paschal" />
                    <option value="Scott Bowler" />
                </datalist>
                <button onClick={e => this.handleSubmit(e)}>SEARCH</button>
            </div>
        )
    }
}
