import React from "react";
import images from "../features/img_filter";

const MatchHistory = props => {
  if (props.match_info.length == 0) {
    return <h3>Loading...</h3>;
  } else {
    const { player_name } = props;

    const match_item = props.match_info.map((item, index) => {
      if (item.score === "x-x") {
        item.score = "";
      }
      let score_label = null;
      if (item.loser === player_name) {
        score_label =
          "L       " +
          item.score
            .split("")
            .reverse()
            .join("");
        item.loser = item.winner;
      } else {
        score_label = "W       " + item.score;
      }
      let video_src;
      let split_url = item.video_url.split('watch?v=');
      let youtube_url = split_url[0] + 'embed/' + split_url[1] + '?autoplay=1&enablejsapi=1&rel=0&showinfo=0&controls=0';
      if(item.video_url.length > 3){
        video_src = <img data = {youtube_url} onClick= {(e) => props.youtube_url_info(e)} className = 'youtube_icon' src= {images['youtube_icon.png']} />
        return(
          <tr className='table-content col-md-4 table-hover' key={`1${index}`}>
            <td data = {youtube_url} onClick={(e) => props.youtube_url_info(e)}>{score_label}</td>
            <td data = {youtube_url} onClick={(e) => props.youtube_url_info(e)}>{item.loser}</td>
            <td data = {youtube_url} onClick={(e) => props.youtube_url_info(e)}>{video_src}</td>
          </tr>
        );
      } else {
        video_src = "N/A";
        return (
          <tr className="table-content col-md-4" key={`1${index}`}>
            <td>{score_label}</td>
            <td>{item.loser}</td>
            <td>{video_src}</td>
          </tr>
        );
      }
    });
    return (
      <table className="table">
        <tbody>{match_item}</tbody>
      </table>
    );
  }
};
export default MatchHistory;
