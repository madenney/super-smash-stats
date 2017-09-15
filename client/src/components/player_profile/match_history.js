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
      var switched_item = null;
      if(item.loser == player_name){
        switched_item = item.score.split('').reverse().join('');
        item.loser = item.winner;
      }
      else{
        switched_item = item.score;
      }
      let video_src;
      let table_style;
      let split_url = item.video_url.split('watch?v=');
      let youtube_url = split_url[0] + 'embed/' + split_url[1];
      if(item.video_url.length > 3){
        video_src = <img data = {youtube_url} onClick= {(e) => props.youtube_url_info(e)} className = 'youtube_icon' src= {images['youtube_icon.png']} />
        table_style = 'table-hover'
      }
      else{
        video_src = 'N/A';
      }

      return(
        <tr className={`table-content col-md-4 ${table_style}`} key={`1${index}`}>
          <td  data = {youtube_url} onClick={(e) => props.youtube_url_info(e)}>{switched_item}</td>
          <td  data = {youtube_url} onClick={(e) => props.youtube_url_info(e)}>{item.loser}</td>
          <td  data = {youtube_url} onClick={(e) => props.youtube_url_info(e)}>{video_src}</td>
        </tr>
      )
    });
    return(
      <table className='table'>
        <tbody>
          {match_item}
        </tbody>
      </table>
    )
  }
}
export default MatchHistory;
