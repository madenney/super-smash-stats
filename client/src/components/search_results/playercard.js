import React from 'react';
import {Link} from 'react-router-dom';
import images from '../features/img_filter';

const Playercard = (props) => {
    if(!props.card[Number(props.cardNum)]){
        return(
            <h1>Loading...</h1>
        );
    }

    const imageUrl = images[`player_pic/${props.card[Number(props.cardNum)].tag}.png`];
    const divStyle = {
        backgroundImage: 'url(' + imageUrl +')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    };

    return(
        <Link to={`/player_profile/${props.card[props.cardNum].id}`}>
            <div className='player_card' style={divStyle}>
                <h3 className='player_text'>{props.card[props.cardNum].tag}</h3>
            </div>
        </Link>
    )
};


export default Playercard;
