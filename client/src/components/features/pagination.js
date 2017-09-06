import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchResults } from "../../actions";
import PopulatePlayerCards from "../search_results/populateplayercards";
import { Link } from "react-router-dom";
import "./pagination.css";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchValue: "",
      currentPage: 1,
      totalPages: null,
      pageArray: [],
      player1: "",
      player1id: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { items, searchValue, totalPages, pageNum, player1 } = nextProps;

    if (!player1) {
      this.setState({
        items,
        searchValue: searchValue.search
          ? searchValue
          : { ...searchValue, search: "top_players" },
        totalPages,
        player1: false,
        currentPage: pageNum
      });
    } else {
      this.setState({
        items,
        searchValue: searchValue.search
          ? searchValue
          : { ...searchValue, search: "top_players" },
        totalPages,
        player1: true,
        player1id: player1,
        currentPage: pageNum
      });
    }
  }

  handleClick(e) {
    const clickedValue = e.target.id;
    this.props.getSearchResults(
      this.state.searchValue.search,
      Number(clickedValue)
    );
    this.setState({ currentPage: clickedValue });
    // axios.post('/autocomplete', {input: this.state.searchValue.search, pageNum: Number(clickedValue), resultsPerPage: 20}).then((response) => {
    //     this.setState({
    //         items: response.data.players,
    //         currentPage: clickedValue
    //     });
    // })
  }

  render() {
    const { player1, player1id, currentPage, searchValue } = this.state;
    const { items } = this.props;
    const { totalPages } = this.props.results;
    const pageArray = [];
    console.log("this is the state: ", this.state);
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push(i);
    }

    //ternaries are freaking awesome
    const sliceFirstParam = `${Number(totalPages) - 3 >= currentPage
      ? `${Number(currentPage) - 3 >= 0 ? Number(currentPage) - 3 : 0}`
      : totalPages - 5}`;
    const sliceSecondParam = `${currentPage < 3 ? 5 : Number(currentPage) + 2}`;
    const displayArray = pageArray.slice(sliceFirstParam, sliceSecondParam);
    const renderPageNumbers = displayArray.map((number, index) => {
      return (
        <Link
          to={
            !player1
              ? `/results/${searchValue.search}/${number}`
              : `/head2headresults/${player1id}/${searchValue.search}/${number}`
          }
          key={index}
        >
          <div
            id={number}
            className={`${Number(number) === Number(currentPage)
              ? "active"
              : "inactive"}`}
            onClick={this.handleClick}
          >
            {number}
          </div>
        </Link>
      );
    });
    const prevPage = `${1 < Number(currentPage)
      ? Number(currentPage) - 1
      : currentPage}`;
    const nextPage = `${Number(totalPages) > Number(currentPage)
      ? Number(currentPage) + 1
      : currentPage}`;
    console.log("page:", currentPage);
    return (
      <div id="page-numbers">
        <Link
          to={
            !player1
              ? `/results/${searchValue.search}/1`
              : `/head2headresults/${player1id}/${searchValue.search}/1`
          }
        >
          <div
            className="paginEdge"
            onClick={this.handleClick}
            id="1"
          >{`<<`}</div>
        </Link>
        <Link
          to={
            !player1
              ? `/results/${searchValue.search}/${prevPage}`
              : `/head2headresults/${player1id}/${searchValue.search}/${prevPage}`
          }
        >
          <div
            className="paginEdge"
            onClick={this.handleClick}
            id={prevPage}
          >{`<`}</div>
        </Link>
        {renderPageNumbers}
        <Link
          to={
            !player1
              ? `/results/${searchValue.search}/${nextPage}`
              : `/head2headresults/${player1id}/${searchValue.search}/${nextPage}`
          }
        >
          <div
            className="paginEdge"
            onClick={this.handleClick}
            id={nextPage}
          >{`>`}</div>
        </Link>
        <Link
          to={
            !player1
              ? `/results/${searchValue.search}/${totalPages}`
              : `/head2headresults/${player1id}/${searchValue.search}/${totalPages}`
          }
        >
          <div
            className="paginEdge"
            onClick={this.handleClick}
            id={totalPages}
          >{`>>`}</div>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results.results
  };
}

export default connect(mapStateToProps, { getSearchResults })(Pagination);
