import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {getH2HResults} from '../../actions';
import Head2HeadPlayerCards from './h2hplayercardresults';
import Pagination from '../features/pagination';
import '../css/stylish.css';
class Head2HeadResults extends Component {
    constructor(props){
      super(props);
      this.state = {
        searchValue: this.props.match.params
      }
    }
    componentWillMount(){
      // console.log('this is props: ', this.props);
      const {id1, search} = this.props.match.params;
      this.props.getH2HResults(id1, search);
    }
    render() {
        // const { player1, player2results} = this.props.h2h_results;
        if(this.props.h2h_results === null){
          return(
            <h1>Loading...</h1>
          )
        }
        else{
          console.log('this props h2h: ', this.props.h2h_results);
          const {name, player1, player2results} = this.props.h2h_results
          return (
              <div className='container fromDarkness'>
                <div className='landingCenter resultsContainer'>
                  <h1>{name} vs...</h1>
                  <Head2HeadPlayerCards player2 = {player2results} player1 = {player1} />
                  {/* <Pagination player1 = {this.state.player1} items={this.state.player2results} searchValue={this.state.searchValue} pageNum={Number(1)} totalPages={this.state.totalPages}/> */}
                </div>
              </div>
          )
        }
    }
}
function mapStateToProps(state){
  return{
    h2h_results: state.h2h_results.h2h_results

  }
}
export default connect(mapStateToProps, {getH2HResults})(Head2HeadResults);
