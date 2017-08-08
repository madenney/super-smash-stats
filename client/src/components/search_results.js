import React, {Component} from 'react';
import axios from 'axios';
import Carousel from './playercardcarousel';
import {Link} from 'react-router-dom';
import Pagination from './pagination';
import './stylish.css';
//will most likely need to be a class component,

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player_cards: [],
            searchValue: this.props.match.params,
            pageNum: null,
            totalPages: null
        }
    }
    componentWillReceiveProps(nextProps) {
        var {search} = nextProps.match.params;
        console.log('Search is:', search);
        if (search == 'noSearch') {
            // console.log('No search given');
            search = '';
        }
        axios.post('http://localhost:3030/autocomplete', {input: search, pageNum: nextProps.pageNum, resultsPerPage: 20, getTotalPages: true}).then((response) => {
            console.log('response', response);
            this.setState({
                player_cards: response.data.players,
                totalPages: response.data.totalAvailablePages
            })
        })
    }
    componentWillMount() {
        var {search} = this.props.match.params;
        console.log('Search is:', search);
        if (search == 'noSearch') {
            // console.log('No search given');
            search = '';
        }
        axios.post('http://localhost:3030/autocomplete', {input: search, pageNum: 1, resultsPerPage: 20, getTotalPages: true}).then((response) => {
            console.log('response', response);
            this.setState({
                searchValue: this.state.searchValue,
                player_cards: response.data.players,
                totalPages: response.data.totalAvailablePages
            })
        })
    }
    render() {
        if (!this.state.player_cards) {
            return <h1>Loading...</h1>
        }

        // console.log('The state is...', this.state.player_cards);
        return (
            <div>
                <Carousel card = {this.state.player_cards} />
                <Pagination items={this.state.player_cards} searchValue={this.state.searchValue} pageNum={Number(1)} totalPages={this.state.totalPages}/>
            </div>
            // <div className='container search_results'>
            //   <div className='col-md-11 offset-md-1 '>
            //     <Carousel card = {this.state.player_cards} />
            //   </div>
            // </div>
        )
    }
}

export default SearchResults;
