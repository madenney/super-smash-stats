import React from 'react';
import {Link} from 'react-router-dom';
import images from './images';

const Head2HeadPlayerCards = (props) => {
  const {player1} = props;
  const player2_cards = props.player2.map((item,index)=>{
    if(!images[`player_pic/${item.tag}.png`]){
      let imageUrl = images['ProfilePlaceholder.gif'];
      let divStyle = {
        backgroundImage: 'url(' + imageUrl +')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }
      return(
          <div className='col-md-2 player_card' style={divStyle} key={index}>
            <Link to={`/head2headprofile/${props.player1}/${item.id}`}>
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
            <Link to={`/head2headprofile/${props.player1}/${item.id}`}>
                <h3 className='player_text'>{item.tag}</h3>
            </Link>
          </div>
      )
    }
  });
  return(
    <div className='container offset-md-1'>{player2_cards}</div>
  )
}
export default Head2HeadPlayerCards;
