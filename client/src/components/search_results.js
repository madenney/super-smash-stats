import React from 'react';
//will most likely need to be a class component,

const SearchResults = (props) => {
  //makes one card at a time
      return(
        <div className="card col-md-4">
          <img className="card-img-top" src={props.player.image_url} alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">{props.player.name}</h4>
            <p className="card-text">Main: {props.player.main}</p>
          </div>
        </div>
    );
  };
export default SearchResults;
