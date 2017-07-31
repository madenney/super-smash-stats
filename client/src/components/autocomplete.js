import React from 'react';
import images from './images';
import './stylish.css';

const Autocomplete = (props) => {

    const autocomItem = props.recommendations.map ((item, index) => {

        return (

        <div className="autocomItem col-12" key={index}>
            <div className="col-4">{item.name}</div>
            <div className="col-4">{item.main}</div>
            <div className="col-4"> <img className="autocomPic" src={item.image_url !== '' ? item.image_url : images['ProfilePlaceholder.gif']}/> </div>
        </div>
        )
    });

     return (
        <div className="autocomplete col-12">
            {autocomItem}
        </div>
     );
};
export default Autocomplete;