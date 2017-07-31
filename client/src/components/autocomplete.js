import React from 'react';
import {Link} from 'react-router-dom';
import images from './images';
import './stylish.css';

const Autocomplete = (props) => {

    const autocomItem = props.recommendations.map ((item, index) => {

        return (
            <Link to={`/player_profile/${item.id}`} key={index}>
                <div className="autocomItem col-12" key={index}>
                    <div className="col-4">{item.name}</div>
                    <div className="col-4">{item.main !== '' || null ? item.main : 'No Main'}</div>
                    <div className="col-4"> <img className="autocomPic" src={item.image_url !== '' || null ? item.image_url : images['ProfilePlaceholder.gif']}/> </div>
                </div>
            </Link>
        )
    });

     return (
        <div className="autocomplete col-12">
            {autocomItem}
        </div>
     );
};
export default Autocomplete;