import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSearchResults } from "../../actions";
import PopulatePlayerCards from "./populateplayercards";
import ReactPagination from 'react-paginate';
import "../css/search_results_page.css";
import '../css/pagination.css';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: this.props.match.params,
            currentPage: 1
        };
    }

    componentDidMount() {
        let { id, search } = this.props.match.params;
        if (search == "top_players") {
            search = "";
        }
        this.props.getSearchResults(search, id);
    }

    handlePageClick(data) {
        const selectedPage = data.selected+1;
        let {search} = this.props.match.params;
        this.props.history.push(`/results/${search}/${selectedPage}`);
        if (search == "top_players") {
            search = "";
        }
        this.props.getSearchResults(search, selectedPage);
    }

    render() {
        if (!this.props.results) {
            return <h1 className="mt-5">Loading...</h1>;
        }
        return (
            <div className="container results--fromDarkness mt-5">
                <div className="row">
                    <div className="col-12 mx-auto">
                        <h1>Player Search Results!</h1>
                        <PopulatePlayerCards
                            card={this.props.results.player_cards}
                        />
                        <ReactPagination 
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"pagination--break"}
                            pageCount={this.props.results.totalPages}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={5}
                            containerClassName={"pagination--container col-12"}
                            pageClassName={"pagination--pages ml-1"}
                            previousClassName={"pagination--keys"}
                            nextClassName={"pagination--keys"}
                            activeClassName={"pagination--active"}
                            onPageChange={(val) => this.handlePageClick(val)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.results.results
    };
}

export default connect(mapStateToProps, { getSearchResults })(SearchResults);
