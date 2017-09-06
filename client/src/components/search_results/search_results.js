import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSearchResults } from "../../actions";
import PopulatePlayerCards from "./populateplayercards";
import Pagination from "../features/pagination";
import "../css/stylish.css";
//will most likely need to be a class component,

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: this.props.match.params
        };
    }
    componentDidMount() {
        var { id, search } = this.props.match.params;
        console.log("id,search", id, search);
        if (search == "top_players") {
            // console.log('No search given');
            search = "";
        }
        this.props.getSearchResults(search, id);

    }
    render() {
        console.log("this.props.results", this);
        if (!this.props.results) {
            return <h1>Loading...</h1>;
        }
        return (
            <div className="container fromDarkness">
                <div className="landingCenter resultsContainer">
                    <h1>Player Search Results!</h1>
                    <PopulatePlayerCards
                        card={this.props.results.player_cards}
                    />
                    <Pagination
                        items={this.props.results.player_cards}
                        searchValue={this.state.searchValue}
                        pageNum={Number(this.state.searchValue.id)}
                        totalPages={this.props.results.totalPages}
                    />
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
