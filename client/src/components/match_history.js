import React from 'react';

const MatchHistory = (props) =>{
  if(props.match_info.length == 0){
    return(
      <h3>Loading...</h3>
    )
  }
  else{
    const {player_name} = props;
    const match_item = props.match_info.map((item,index)=>{
      console.log('this is item: ', item);
      var switched_item = null;
      if(item.loser == player_name){
        switched_item = item.score.split('').reverse().join('');
        item.loser = item.winner;
      }
      else{
        switched_item = item.score;
      }
      if(item.video_url === ''){
        item.video_url = 'No Video'
      }

      return(
        <tr className='col-md-4' key={`1${index}`}>
          <td>{switched_item}</td>
          <td>{item.loser}</td>
          <td>{item.tournament}</td>
          <td>{item.video_url}</td>
        </tr>
      )
    });
    return(
      <table className='table'>
        <thead>
          <tr className='col-md-4 theader'>
            <td>Set Count</td>
            <td>Opponent</td>
            <td>Tournament</td>
            <td>Youtube Video</td>
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
