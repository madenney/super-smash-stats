import React from 'react';
const H2HMatchHistory = (props) => {
  if(props.matches.length === 0){
    return(
      <h1>Loading...</h1>
    )
  }
  console.log('props have arrived: ', props.matches);
  const indivd_matches = props.matches.map((item,index)=>{
    return(
      <tr key={index}>
        <td>{item.winner}</td>
        <td>{item.score}</td>
        <td>{item.loser}</td>
        <td>{item.tournament}</td>
      </tr>
    )
  })
  return(
    <table className='table'>
      <thead>
        <tr>
          <th>Winner</th>
          <th>Score</th>
          <th>Loser</th>
          <th>Tournament</th>
        </tr>
      </thead>
      <tbody className='h2hrecent_match'>
        {indivd_matches}
      </tbody>
    </table>
  )
}
export default H2HMatchHistory;
