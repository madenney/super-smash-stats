import React from 'react';

const TournamentHistory = (props) => {
  if(props.tournament_info.length === 0 || props.tournament_info == undefined){
    return(
      <h2>Loading...</h2>
    )
  }
  else{
  // console.log('this is tournamentinfo: ',props.tournament_info)
  const tournament_item = props.tournament_info.map((item,index)=>(
    <tr key={index}>
      <td>{item.tournament}</td>
    </tr>
  ));
  return(
    <table>
      <tbody>{tournament_item}</tbody>
    </table>
  )
  }
}
export default TournamentHistory;
