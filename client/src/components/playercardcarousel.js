import React from 'react';
import {Link} from 'react-router-dom';
import ProfilePlaceholder from './imgs/ProfilePlaceholder.gif';
import images from './images';

const Carousel = (props) => {
  // console.log('cards props:', props);
  if(!props.card || Object.keys(props.card).length < 1){
    return(
      <h1>Loading...</h1>
    );
  }
    const player_cards = props.card.map((item, index)=>{
      // let imageUrl = '';
      // const imageCheck = images[item.tag] + '.png';
      // console.log('imageCheck:', imageCheck);
      // if(!images[item.tag]){
      //   imageUrl = ProfilePlaceholder;
      // }
      // else{
      let imageUrl = images[item.tag + '.png'];
      // }

//      console.log('this is imageURL: ', imageUrl);
      const divStyle = {
        backgroundImage: 'url(' + imageUrl +')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      };

    return(
      <Link to={`/player_profile/${item.id}`} key={index}>
        <div className='player_card' style={divStyle}>
          <h3 className='player_text'>{item.tag}</h3>
        </div>
      </Link>
    )
  });

  return (
      <div>{player_cards}</div>
    )
  }
export default Carousel;
