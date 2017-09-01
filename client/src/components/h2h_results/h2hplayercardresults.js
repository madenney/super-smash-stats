import React from 'react';
import {Link} from 'react-router-dom';
import images from '../features/img_filter';

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
          <Link to={`/head2headprofile/${props.player1}/${item.id}`} key={index}>
            <div className='player_card' style={divStyle}>
                <h3 className='player_text'>{item.tag}</h3>
            </div>
          </Link>
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
        <Link to={`/head2headprofile/${props.player1}/${item.id}`} key={index}>
          <div className='player_card' style={divStyle}>
                <h3 className='player_text'>{item.tag}</h3>
          </div>
        </Link>
      )
    }
  });
  return(
    <div className='container center'>{player2_cards}</div>
  )
}
export default Head2HeadPlayerCards;
