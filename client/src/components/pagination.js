import React, { Component } from 'react';
import Carousel from './playercardcarousel';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './pagination.css';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            searchValue: '',
            currentPage: 1,
            totalPages: null,
            pageArray: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
//        console.log('CWRP');
        this.setState({
            items: nextProps.items,
            searchValue: nextProps.searchValue,
            totalPages: nextProps.totalPages
        });
    }
    handleClick(e) {
//        console.log('this is the url string: ', this.props);
        const clickedValue = e.target.id;
        axios.post('http://localhost:3030/autocomplete', {input: this.state.searchValue.search, pageNum: Number(clickedValue), resultsPerPage: 20}).then((response) => {
            console.log('CALL COMPLETE');
            this.setState({
                items: response.data.players,
                currentPage: clickedValue
            });
            console.log('items', this.state.items);
        })
    };

    render(){
        const { items, currentPage, searchValue, totalPages } = this.state;
        const pageArray = [];
        for (let i = 1; i <= totalPages; i++) {
            pageArray.push(i);
        }


        const displayArray = pageArray.slice((Number(currentPage) - 1), (Number(currentPage) + 4));

        const renderPageNumbers = displayArray.map((number, index) => {
            return (
                <Link to={`/results/${searchValue.search}/${number}`} key={index}>
                    <div
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
                <div id="page-numbers">
                    <Link to={`/results/${searchValue.search}/1`}>
                        <div className="paginEdge" onClick={this.handleClick} id="1">First Page</div>
                    </Link>
                    {renderPageNumbers}
                    <Link to={`/results/${searchValue.search}/${totalPages}`}>
                        <div className="paginEdge" onClick={this.handleClick} id={totalPages}>Last Page</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Pagination;