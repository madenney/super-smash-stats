import React, {Component} from 'react';
import Carousel from './playercardcarousel';
import {Link} from 'react-router-dom';

//will most likely need to be a class component,

class SearchResults extends Component{
  constructor(props){
    super(props);
    this.state = {
      player_cards:[]
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      player_cards: nextProps.result.data
    });
  }

  render(){
    if(!this.state.player_cards){
      return <h1>Loading...</h1>
    }

    console.log('The state is...', this.state.player_cards)
    return(
      <div>
        <Link to='/' className='btn btn-outline-default'>Home!</Link>
        <Carousel card = {this.state.player_cards} />
      </div>
    )
  }
}
    // if(props.card.length>1){
    //   console.log(props.card);
    //  const list = props.card.map((item,index)=>{
    //   return(
    //     <div key={index} className="card col-md-3">
    //       <img className="card-img-top" src={item.image_url} alt="Card image cap"/>
    //       <div className="card-block">
    //         <h4 className="card-title">Tag: {item.tag}</h4>
    //         <p className="card-text">Main: {item.main}</p>
    //       </div>
    //     </div>
    //     );
    //  });
    // return(
    //     <div className='card-deck'>
    //       {list}
    //     </div>
    // )
    //
    // }
    // if(props.card.length===1){
    //   return(
    //   <div className='card-deck'>
    //     <div key={props.card.id} className="card">
    //       <img className="card-img-top" src={props.card.image_url} alt="Card image cap"/>
    //       <div className="card-block">
    //         <h4 className="card-title">Tag: {props.card.tag}</h4>
    //         <p className="card-text">Main: {props.card.main}</p>
    //       </div>
    //     </div>
    //   </div>
    //   )
    // }
export default SearchResults;
