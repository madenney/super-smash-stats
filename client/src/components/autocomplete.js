import React from 'react';

const Autocomplete = (props) => {

    const autocomItem = props.recommendations.map ((item, index) => {
        return (
        <li key={index}>
            {item.name} {item.main}
        </li>
        )
    });

     return (
        <ul className="autocomplete">
            {autocomItem}
        </ul>
     );
};
export default Autocomplete;