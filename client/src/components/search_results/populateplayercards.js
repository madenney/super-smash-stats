import React from "react";
import { Link } from "react-router-dom";
import images from "../features/img_filter";

const PopulatePlayerCards = props => {
    // console.log('cards props:', props);
    if (!props.card || Object.keys(props.card).length < 1) {
        return <h1 className="mt-5">Loading...</h1>;
    }

    let imagesKeys = Object.keys(images);

    const player_cards = props.card.map((item, index) => {
        let imageUrl = images["ProfilePlaceholder.gif"];
        for (let i = 0; i < imagesKeys.length; i++) {
            if (
                imagesKeys[i].toLowerCase() ===
                `player_pic/${item.tag.toLowerCase()}.png`
            ) {
                imageUrl = images[imagesKeys[i]];
                break;
            }
        }

        let divStyle = {
            backgroundImage: "url(" + imageUrl + ")"
        };

        return (
            <Link
                className="col-6 col-sm-6 col-md-3 my-2"
                to={`/player_profile/${item.id}`}
                key={index}>
                <div className="player_card" style={divStyle}>
                    <h3 className="player_text">{item.tag}</h3>
                </div>
            </Link>
        );
    });

    return <div className="container mx-auto row">{player_cards}</div>;
};
export default PopulatePlayerCards;
