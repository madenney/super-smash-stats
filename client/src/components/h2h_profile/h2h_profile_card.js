import React from 'react';
import { Link } from 'react-router-dom';
import images from "../features/img_filter";

export default (props) => {
	return (
		<div className="row col-md-5 col-sm-12">
		  <div className="col-6 mb-2">
		    <Link className="player_image" to={`/player_profile/${props.id}`}>
		      <img
		        className="player-image"
		        src={
		          images[`player_pic/${props.tag}.png`] ? (
		            images[`player_pic/${props.tag}.png`]
		          ) : (
		            ProfilePlaceholder
		          )
		        }
		      />
		    </Link>
		  </div>
		  <div className="col-6">
		    <h2 className="player-info">{props.tag}</h2>
		    <h4 className="player-info">
		      Location: {props.location}
		    </h4>
		    <p className="player-info">Main: </p>
		    <div className="row">
		      <img
		        className="player-characters"
		        src={images[`characters/${props.main}.png`]}
		      />
		      <img
		        className="player-characters"
		        src={
		          images[`characters/${props.secondary}.png`] ? (
		            images[`characters/${props.secondary}.png`]
		          ) : (
		            images["no_character.png"]
		          )
		        }
		      />
		    </div>
		  </div>
		</div>
		)
}
















// <div className="row col-5">
//   <div className="col-6">
//     <Link className="col-6" to={`/player_profile/${id2}`}>
//       <img
//         className="player-image"
//         src={
//           images[`player_pic/${player2.tag}.png`] ? (
//             images[`player_pic/${player2.tag}.png`]
//           ) : (
//             ProfilePlaceholder
//           )
//         }
//       />
//     </Link>
//     <div className="col-6">
//       <h2 className="player-info">{player2.tag}</h2>
//       <h4 className="player-info">
//         Location: {player2.location}
//       </h4>
//       <p className="player-info">Main: </p>
//       <div className="row">
//         <img
//           className="player-characters"
//           src={images[`characters/${player2.main}.png`]}
//         />
//         <img
//           className="player-characters"
//           src={
//             images[`characters/${player2.secondary}.png`] ? (
//               images[`characters/${player2.secondary}.png`]
//             ) : (
//               images["no_character.png"]
//             )
//           }
//         />
//       </div>
//     </div>
//   </div>
// </div>