import React from 'react';
import {Link} from 'react-router-dom';
import images from '../features/img_filter';
import '../css/stylish.css';
import '../css/autocomplete.css';
import ProfilePlaceholder from '../imgs/ProfilePlaceholder.gif';

const Autocomplete = (props) => {
    const autocomItem = props.recommendations.map ((item, index) => {
        return (
            <Link to={`/player_profile/${item.id}`} key={index}>
                <div className={`autocomplete-item col-12 ${props.highlight === index ? 'highlighted' : ''}`} key={index}>
                    <div className="col-6">{item.tag}</div>
                    <div className="col-4">{item.main === '' || item.main === '' ?  '' : item.main}</div>
                    <div className="col-2"> <img className="autocomplete-pic" src={!images[`player_pic/${item.tag}.png`] ? ProfilePlaceholder : images[`player_pic/${item.tag}.png`]} /></div>
                </div>
            </Link>
        )
    });

     return (
        <div className="autocomplete">
            {autocomItem}
        </div>
     );
};
export default Autocomplete;
//component for image url for database side: item.image_url === '' || item.image_url === null? images['ProfilePlaceholder.gif'] : item.image_url
