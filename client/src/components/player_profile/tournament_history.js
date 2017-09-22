import React from 'react';

// import MatchHistory from './match_history';
const TournamentHistory = (props) => {
  if(props.tournaments_attended == undefined){
    return;
  }
  const individ_tournament = props.tournaments_attended.map((item, index)=>{
    return(
      <option value={item} className='tournamentItem' key={index}>{item}</option>
    )
  })
  return(
    <select onChange={props.grab_tourney}>{individ_tournament}</select>
  )
}
export default TournamentHistory;
