import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getH2HResults } from "../../actions";
import Head2HeadPlayerCards from "./h2hplayercardresults";
// import "../css/stylish.css";

class Head2HeadResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: this.props.match.params
    };
  }

  componentDidMount() {
    const { id1, search } = this.props.match.params;
    this.props.getH2HResults(id1, search);
  }

  render() {
    if (this.props.h2h_results === null) {
      return <h1 className="container">Loading...</h1>;
    }
    else if(this.props.h2h_results.player2results.length === 0){
      console.log(this.props.h2h_results.player2results)
      return <h1 className="container">This Match-Up Does Not Exist</h1>
    }
    else {
      const { name, player1, player2results } = this.props.h2h_results;
      return (
        <div className="container fromDarkness">
          <div className="landingCenter resultsContainer">
            <h1>{name} vs...</h1>
            <Head2HeadPlayerCards player2={player2results} player1={player1} />
          </div>
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    h2h_results: state.h2h_results.h2h_results
  };
}
export default connect(mapStateToProps, { getH2HResults })(Head2HeadResults);
