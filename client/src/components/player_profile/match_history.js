import React from 'react';
import images from '../features/img_filter';

const MatchHistory = (props) =>{
  if(props.match_info.length == 0){
    return(
      <h3>Loading...</h3>
    )
  }
  else{
    const {player_name} = props;
    const match_item = props.match_info.map((item,index)=>{
      // console.log('this is item: ', item);
      var switched_item = null;
      if(item.loser == player_name){
        switched_item = item.score.split('').reverse().join('');
        item.loser = item.winner;
      }
      else{
        switched_item = item.score;
      }
      let video_src;
      let split_url = item.video_url.split('watch?v=');
      let youtube_url = split_url[0] + 'embed/' + split_url[1];
      // console.log('youtube url: ', youtube_url);
      if(item.video_url.length > 3){
        video_src = <img data = {youtube_url} onClick= {(e) => props.youtube_url_info(e)} className = 'youtube_icon' src= {images['youtube_icon.png']} />
      }
      else{
        video_src = 'No Video';
      }

      return(
        <tr className='col-md-4' key={`1${index}`}>
          <td>{switched_item}</td>
          <td>{item.loser}</td>
          <td>{video_src}</td>
        </tr>
      )
    });
    return(
      <table className='table'>
        <thead>
          <tr className='col-md-4 theader'>
            <td>Set Count</td>
            <td>Opponent</td>
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
