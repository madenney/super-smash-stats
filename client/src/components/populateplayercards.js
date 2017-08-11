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
    if(!images[`player_pic/${item.tag}.png`]){
      let imageUrl = images['ProfilePlaceholder.gif'];
      let divStyle = {
        backgroundImage: 'url(' + imageUrl +')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }
      return(
          <div className='col-md-2 player_card' style={divStyle} key={index}>
            <Link to={`/player_profile/${item.id}`}>
                <h3 className='player_text'>{item.tag}</h3>
            </Link>
          </div>
      )
    }
    else{
      let imageUrl = images[`player_pic/${item.tag}.png`];
      let divStyle = {
        backgroundImage: 'url(' + imageUrl +')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }
      return(
          <div className='col-md-2 player_card' style={divStyle} key={index}>
            <Link to={`/player_profile/${item.id}`}>
                <h3 className='player_text'>{item.tag}</h3>
            </Link>
          </div>
      )
    }
  });

  return (
        <div className='container offset-md-1'>{player_cards}</div>
  )
};
export default PopulatePlayerCards;
