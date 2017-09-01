import React from 'react';

// import MatchHistory from './match_history';
const TournamentHistory = (props) => {
  const individ_tournament = props.tournaments_attended.map((item, index)=>{
    return(
      <div className='tournamentItem' onClick={props.grab_tourney} key={index}>{item}</div>
    )
  })
  return(
    <div>{individ_tournament}</div>
  )
}
export default TournamentHistory;
