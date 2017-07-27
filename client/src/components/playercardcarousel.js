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
    return(
    <Link to={`/player_profile/${item.id}`} key={index}>
      <li value={item.id}>
        {item.name} {item.main}
      </li>
    </Link>
    )
  });
  return (
      <div className="Carousel">
        <ul>{player_cards}</ul>
      </div>
    )
  }
export default Carousel;
