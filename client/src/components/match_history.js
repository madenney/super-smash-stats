import React from 'react';

const MatchHistory = (props) =>{
  if(props.match_info.length == 0){
    return(
      <h3>Double Click on Recent Tournament</h3>
    )
  }
  else{
    const match_item = props.match_info.map((item,index)=>{
      return(
        <tr className='col-md-4' key={`1${index}`}>
          <td>{item.winner}</td>
          <td>{item.score}</td>
          <td>{item.loser}</td>
          <td>{item.tournament}</td>
        </tr>
      )
    });
    return(
      <table className='table'>
        <thead>
          <tr className='col-md-4 theader'>
            <td>Winner</td>
            <td>Set Count</td>
            <td>Loser</td>
            <td>Tournament</td>
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
