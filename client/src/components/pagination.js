import React, { Component } from 'react';
import Carousel from './playercardcarousel';
import {Link} from 'react-router-dom';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            searchValue: this.props.searchValue,
            currentPage: this.props.pageNum,
            totalPages: this.props.totalPages
        };
        this.handleClick = this.handleClick.bind(this);
    }
//take search result array and paginate
    componentWillReceiveProps(nextProps){
        this.setState({
            items: nextProps.items,
            searchValue: nextProps.searchValue,
            currentPage: nextProps.pageNum,
            totalPages: nextProps.totalPages
        });
            console.log('THE STATE', this.state);

    }

    handleClick(e) {
        axios.post('http://localhost:3030/autocomplete', {input: searchValue, pageNum: Number(e.target.id), number: 20}).then((response) => {
            this.setState({
                items: response.something,
                currentPage: Number(e.target.id)
            })
        })
    }

    render() {
        const { items, currentPage, searchValue, totalPages } = this.state;
        //items for current page
        console.log('CI', items);
        const renderItems = () => {
            return (
                <Carousel cards = {items} />
            )
        };

        const pageArray = [];

        for (i = currentPage; i <= totalPages; i++) {
            pageArray.push(i);
        }

        const renderPageNumbers = pageArray.map(number => {
            return (
                <Link to={`/results/${searchValue.search}/${number}`}>
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
                    {renderItems}
                </div>
                <div id="page-numbers">
                    {renderPageNumbers}
                    <div key=""
                    >{totalPages}</div>
                </div>
            </div>
        );
    }
}

export default Pagination;