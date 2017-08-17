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
            pageArray: [],
            player1: '',
            player1id:''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.player1){
          this.setState({
            items: nextProps.items,
            searchValue: nextProps.searchValue,
            totalPages: nextProps.totalPages,
            player1: false
          });
        }
        else{
          this.setState({
            items: nextProps.items,
            searchValue: nextProps.searchValue,
            totalPages: nextProps.totalPages,
            player1: true,
            player1id: nextProps.player1
          })
        }

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
        const { player1, player1id, items, currentPage, searchValue, totalPages } = this.state;
        const pageArray = [];
        console.log('this is the state: ', this.state);
        for (let i = 1; i <= totalPages; i++) {
            pageArray.push(i);
        }

//ternaries are freaking awesome
        const displayArray = pageArray.slice(`${(Number(currentPage) - 3) >= 0 ? (Number(currentPage) - 3) : 0}`, (Number(currentPage) + 2));
          const renderPageNumbers = displayArray.map((number, index) => {
              return (
                  <Link to={!player1 ? `/results/${searchValue.search}/${number}` : `/head2headresults/${player1id}/${searchValue.search}/${number}`} key={index}>
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
                    <Link to={!player1 ? `/results/${searchValue.search}/1` : `/head2headresults/${player1id}/${searchValue.search}/1`}>
                        <div className="paginEdge" onClick={this.handleClick} id="1">First Page</div>
                    </Link>
                    {renderPageNumbers}
                    <Link to={!player1 ? `/results/${searchValue.search}/${totalPages}` : `/head2headresults/${player1id}/${searchValue.search}/${totalPages}`}>
                        <div className="paginEdge" onClick={this.handleClick} id={totalPages}>Last Page</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Pagination;
