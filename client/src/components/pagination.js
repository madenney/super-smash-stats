import React, { Component } from 'react';
import PopulatePlayerCards from './populateplayercards';
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
            this.setState({
                items: response.data.players,
                currentPage: clickedValue
            });
        })
    };

    render(){
        const { items, currentPage, searchValue, totalPages } = this.state;
        const pageArray = [];
        console.log('this is the state: ', this.state);
        for (let i = 1; i <= totalPages; i++) {
            pageArray.push(i);
        }

//tertiaries are freaking awesome
        const displayArray = pageArray.slice(`${(Number(currentPage) - 3) >= 0 ? (Number(currentPage) - 3) : 0}`, (Number(currentPage) + 2));
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
            <div className='offset-md-5'>
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
