
import React from 'react';
import {Link} from 'react-router-dom';
import images from './images';

const PopulatePlayerCards = (props) => {
  // console.log('cards props:', props);
  if(!props.card || Object.keys(props.card).length < 1){
    return(
      <h1>Loading...</h1>
    );
  }
  const player_cards = props.card.map((item, index)=>{
    let imageUrl = images[item.tag + '.png'];
    const divStyle = {
      backgroundImage: 'url(' + imageUrl +')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    };

    return(
        <div>
          <Link to={`/player_profile/${item.id}`} key={index}>
            <div className='player_card' style={divStyle}>
              <h3 className='player_text'>{item.tag}</h3>
            </div>
          </Link>
        </div>
    )
  });

  return (
        <player_cards />
  )
};
export default PopulatePlayerCards;
