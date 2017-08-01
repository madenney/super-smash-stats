import React from 'react';
import {Link} from 'react-router-dom';
const Carousel = (props) => {
  console.log('cards props:', props);
  if(!props.card || Object.keys(props.card).length < 1){
    return(
      <h1>Loading...</h1>
    )
  }
  const player_cards = props.card.map((item, index)=>{
    // if(item.main === null){
    //   item.main = 'Your mom';
    // }
    return(
    <Link to={`/player_profile/${item.id}`} key={index}>
      <div className='player_card'>
        <h3>{item.tag}</h3>
        <p>{item.main}</p>
      </div>
    </Link>
    )
  });
  return (
      <div>{player_cards}</div>
    )
  }
export default Carousel;
