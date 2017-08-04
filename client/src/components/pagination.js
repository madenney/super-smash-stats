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
        const clickedValue = e.target.id;
        axios.post('http://localhost:3030/autocomplete', {input: this.state.searchValue.search, pageNum: Number(clickedValue), resultsPerPage: 20}).then((response) => {
            this.setState({
                items: response.data.players,
                currentPage: clickedValue

            })
        })
    }

    render(){
        console.log('THE STATE', this.state);
        const { inputComponent, items, currentPage, searchValue, totalPages } = this.state;


        for (let i = 1; i <= totalPages; i++) {
            this.state.pageArray.push(i);
        }
//         let truncatedArray = null;
//         function () => {
//             if (totalPages < 2){
//                 truncatedArray = [1];
//             } else if (totalPages < 3) {
//                 truncatedArray = [1, 2];
//             } else if (totalPages < 4) {
//                 truncatedArray = [1, 2, 3];
//             } else if (totalPages < 5) {
//                 truncatedArray = [1, 2, 3, 4];
//             } else if (totalPages < 6) {
//                 truncatedArray = [1, 2, 3, 4, 5];
//             } else if (currentPage > 3 && currentPage < totalPages - 2) {
//                 truncatedArray = [1, null, currentPage-1, currentPage, currentPage+1, null, totalPages];
//             } else if (currentPage > totalPages - 3){
//                 truncatedArray = [1, null, totalPages - 2, totalPages -1, totalPages];
//             }
//         };
// console.log ('truncated', truncatedArray);
        const renderPageNumbers = this.state.pageArray.map(number => {
            return (
                <Link to={`/results/${searchValue.search}/${number}`} key={number}>
                    <div
                        id={number}
                        onClick={this.handleClick}
                    >
                        {number}
                    </div>
                </Link>
            );
        });

        const ChosenComponent = () => {
            switch (inputComponent) {
                case 'search_results':
                    return (
                        <Carousel card = {items} />
                    );
                    break;
                default:
                    return (<div>NADA</div>);
                    break;

            }
        };

        return (
            <div>
                <ChosenComponent />
                <div id="page-numbers">
                    {renderPageNumbers}
                </div>
            </div>
        );
    }
}

export default Pagination;