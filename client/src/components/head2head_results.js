import React, {Component} from 'react';
import axios from 'axios';
import Head2HeadPlayerCards from './h2hplayercardresults';
import Pagination from './pagination';
import './stylish.css';
class Head2HeadResults extends Component {
    constructor(props){
      super(props);
      this.state = {
        player1: '',
        player2results: [],
        totalPages: '',
        searchValue: this.props.match.params
      }
    }
    componentWillMount(){
      // console.log('this is props: ', this.props);
      const {id1, page} = this.props.match.params;
      console.log('this is props: ', this.props)
      let {search} = this.props.match.params;
       if(search == 'noSearch'){
        search = '';
      }
      axios.post('http://localhost:3030/head2headsearch', {player1: id1, input: search, pageNum: 1, resultsPerPage: 20, getTotalPages: true}).then((response)=>{
        console.log('this is the response: ', response);
        this.setState({
          player2results: response.data.outputRows,
          player1: id1,
          totalPages: response.data.totalAvailablePages
        })
      })
    }
    render() {
        const {player1, player2results} = this.state;
        if(!player2results){
          return(
            <h1>Loading...</h1>
          )
        }
        else{
            console.log('the state is', this.state);
          return (
              <div className='container fromDarkness'>
                <div className='landingCenter resultsContainer'>
                  <h1>Head To Head Results</h1>
                  <Head2HeadPlayerCards player2 = {player2results} player1 = {player1} />
                  <Pagination player1 = {this.state.player1} items={this.state.player2results} searchValue={this.state.searchValue} pageNum={Number(1)} totalPages={this.state.totalPages}/>
                </div>
              </div>
          )
        }
    }
}

export default Head2HeadResults;
