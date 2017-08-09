import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Autocomplete from './autocomplete';

export default class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            autocomCards: [],
            cards: ''
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        if (e.target.value != '') {
            axios.post('http://localhost:3030/autocomplete', { input: e.target.value, pageNum: 1, resultsPerPage: 10 }).then((response) => {
                this.setState({
                    autocomCards: response.data.players
                });
            })
        } else {
            this.setState({
                autocomCards: []
            })
        }
    }
    render(){
        const { value } = this.state;
        // console.log('Value:', this.state.autocomCards);
        return (
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

        )
    }
}
