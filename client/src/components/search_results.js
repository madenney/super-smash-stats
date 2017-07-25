import React from 'react';
import dummyData from './dummy_data';
import ProfilePlaceholder from './imgs/ProfilePlaceholder.gif';
//will most likely need to be a class component,

const SearchResults = (props) => {
  //makes one card at a time
  const indiv_card = props.card.map((item,index)=>{
      return(
        <div className="card"  key={index}>
          <img className="card-img-top" src={ProfilePlaceholder} alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">{item.name}</h4>
            <p className="card-text">Ranking: {item.ranking}</p>
            <p className="card-text">Main: {item.main}</p>
            <p className="card-text">Origin: {item.origin}</p>
            <p className="card-text">Recent Tournament: {item.recent_tournament}</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
    );
  });
  return(
    //all in a deck of cards
    <div className='card-deck'>
      {indiv_card}
    </div>
  )

}
export default SearchResults;
