import React from "react";
import images from "../features/img_filter";

const H2HMatchHistory = props => {
  if (props.matches.length === 0) {
    return <h1>Loading...</h1>;
  }

  const matchesRow = props.matches.map((item, index) => {
    let video_src;
    if (item.video_url.length > 3) {
      let split_url = item.video_url.split("watch?v=");
      let youtube_url = split_url[0] + "embed/" + split_url[1];
      video_src = (
        <img
          data={youtube_url}
          onClick={e => props.youtube_url_info(e)}
          className="youtube_icon"
          src={images["youtube_icon.png"]}
        />
      );
      return (
        <tr className="table-content" key={index}>
          <td data={youtube_url} onClick={e => props.youtube_url_info(e)}>
            {item.winner}
          </td>
          <td data={youtube_url} onClick={e => props.youtube_url_info(e)}>
            {item.score}
          </td>
          <td data={youtube_url} onClick={e => props.youtube_url_info(e)}>
            {item.tournament}
          </td>
          <td data={youtube_url} onClick={e => props.youtube_url_info(e)}>
            {video_src}
          </td>
        </tr>
      );
    } else {
      video_src = "N/A";
      return (
        <tr key={index}>
          <td>{item.winner}</td>
          <td>{item.score}</td>
          <td>{item.tournament}</td>
          <td>{video_src}</td>
        </tr>
      );
    }
  });

  return (
    <table className="table">
      <thead className="theader">
        <tr>
          <th>Winner</th>
          <th>Score</th>
          <th>Tournament</th>
          <th>Video</th>
        </tr>
      </thead>
      <tbody className="h2h-recent_match">{matchesRow}</tbody>
    </table>
  );
};
export default H2HMatchHistory;
