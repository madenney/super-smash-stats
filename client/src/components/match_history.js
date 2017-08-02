import React from 'react';

const MatchHistory = (props) =>{
  if(props.match_info.length == 0){
    return(
      <h1>Loading...</h1>
    )
  }
  else{
    const match_item = props.match_info.map((item,index)=>{
      return(
        <tr>
          <td>{item.winner}</td>
          <td>{item.score}</td>
          <td>{item.loser}</td>
        </tr>
      )
    });
    return(
      <table>
        <thead>
          <tr>
            <td>Winner</td>
            <td>Set Count</td>
            <td>Loser</td>
          </tr>
        </thead>
        <tbody>
          {match_item}
        </tbody>
      </table>
    )
  }
}
export default MatchHistory;
