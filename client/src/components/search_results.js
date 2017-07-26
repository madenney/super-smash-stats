import React, {Component} from 'react';
//will most likely need to be a class component,

const SearchResults = (props) =>{
    if(props.card.length>1){
      console.log(props.card);
     const list = props.card.map((item,index)=>{
      return(
        <div key={index} className="card col-md-3">
          <img className="card-img-top" src={item.image_url} alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">Tag: {item.tag}</h4>
            <p className="card-text">Main: {item.main}</p>
          </div>
        </div>
        );
     });
    return(
        <div className='card-deck'>
          {list}
        </div>
    )

    }
    if(props.card.length===1){
      return(
      <div className='card-deck'>
        <div key={props.card.id} className="card">
          <img className="card-img-top" src={props.card.image_url} alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">Tag: {props.card.tag}</h4>
            <p className="card-text">Main: {props.card.main}</p>
          </div>
        </div>
      </div>
      )
    }
    
  };
export default SearchResults;
