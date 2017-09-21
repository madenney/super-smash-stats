import React, { Component } from "react";
import images from "../features/img_filter";
import "../css/character_select.css";

class CharacterSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character_selected: ""
    };
  }
  render() {
    return (
      <div className="container">
        {/*<div className="row">
          <div className="col-6 offset-3 mt-5">
            <h1>Character Selection Is Coming Soon!</h1>
          </div>
        </div>*/}
        <div className="row">
          <div className="col-12 mx-auto">
            <img className="col-2" src={images["character_select/Mario.png"]} />
            <img className="col-2" src={images["character_select/Luigi.png"]} />
            <img className="col-2" src={images["character_select/Peach.png"]} />
            <img className="col-2" src={images["character_select/Yoshi.png"]} />
            <img className="col-2" src={images["character_select/DK.png"]} />
            <img
              className="col-2"
              src={images["character_select/C.Falcon.png"]}
            />
            <img
              className="col-2"
              src={images["character_select/Ganondorf.png"]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mx-auto">
            <img className="col-2" src={images["character_select/Falco.png"]} />
            <img className="col-2" src={images["character_select/Fox.png"]} />
            <img
              className="col-2"
              src={images["character_select/Ice Climber.png"]}
            />
            <img className="col-2" src={images["character_select/Samus.png"]} />
            <img className="col-2" src={images["character_select/Zelda.png"]} />
            <img className="col-2" src={images["character_select/Link.png"]} />
            <img
              className="col-2"
              src={images["character_select/Young Link.png"]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mx-auto">
            <img className="col-2" src={images["character_select/Pichu.png"]} />
            <img
              className="col-2"
              src={images["character_select/Pikachu.png"]}
            />
            <img
              className="col-2"
              src={images["character_select/Jigglypuff.png"]}
            />
            <img
              className="col-2"
              src={images["character_select/Mewtwo.png"]}
            />
            <img
              className="col-2"
              src={images["character_select/Mr Game Watch.png"]}
            />
            <img className="col-2" src={images["character_select/Marth.png"]} />
            <img className="col-2" src={images["character_select/Roy.png"]} />
          </div>
        </div>
      </div>
    );
  }
}
export default CharacterSelect;
