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
            currentPage: '',
            totalPages: null,
            pageArray: [],
            inputComponent: ''
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
            inputComponent: nextProps.inputComponent
        });
    }

    handleClick(e) {
        console.log('this is the url string: ', this.props);
        const clickedValue = e.target.id;
        axios.post('http://localhost:3030/autocomplete', {input: this.state.searchValue.search, pageNum: Number(clickedValue), resultsPerPage: 20}).then((response) => {
            this.setState({
                items: response.data.players,
                currentPage: clickedValue
            })
        });
    }

    render(){
        console.log('THE STATE', this.state);
        const { inputComponent, items, currentPage, searchValue, totalPages } = this.state;
        const pageArray = [];
        for (let i = 1; i <= totalPages; i++) {
            pageArray.push(i);
        }
        const displayArray = pageArray.slice((Number(currentPage) - 1), (Number(currentPage) + 2));
        console.log('disp', displayArray);

        const ChosenComponent = () => {
            switch (inputComponent) {
                case 'search_results':
                    return (
                        <Carousel card = {items} />
                    );
                default:
                    return (<div>NADA</div>);
            }
        };

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
                <ChosenComponent />
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