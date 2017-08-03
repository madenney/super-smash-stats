import React, { Component } from 'react';
import Carousel from './playercardcarousel';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            searchValue: '',
            currentPage: '',
            totalPages: null,
            pageArray: [],
            component: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }
//take search result array and paginate
    componentWillReceiveProps(nextProps){
        this.setState({
            items: nextProps.items,
            searchValue: nextProps.searchValue,
            currentPage: nextProps.pageNum,
            totalPages: nextProps.totalPages,
            component: nextProps.component
        });
    }

    handleClick(e) {
        const clickedValue = e.target.id;
        axios.post('http://localhost:3030/autocomplete', {input: this.state.searchValue.search, pageNum: Number(clickedValue), resultsPerPage: 20}).then((response) => {
            this.setState({
                items: response.data.players,
                currentPage: clickedValue

            })
        })
    }

    render() {
        console.log('THE STATE', this.state);
        const { items, currentPage, searchValue, totalPages } = this.state;

        for (let i = 1; i <= totalPages; i++) {
            this.state.pageArray.push(i);
        }

        const renderPageNumbers = this.state.pageArray.map(number => {
            return (
                <Link to={`/results/${searchValue.search}/${number}`} key={number}>
                    <div
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                    >
                        {number}
                    </div>
                </Link>
            );
        });

        return (
            <div>
                <div>
                    <Carousel card = {items} />
                </div>
                <div id="page-numbers">
                    {renderPageNumbers}
                </div>
            </div>
        );
    }
}

export default Pagination;