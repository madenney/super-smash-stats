import React, { Component } from "react";
import images from "../features/img_filter";

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
        <div className="row">
          <div className="col-6 offset-3 mt-5">
            <h1>Character Selection Is Coming Soon!</h1>
          </div>
        </div>
        {/* For future development: <div className="row">
          <div className="col-md-12">
            <img src={images["character_select/Mario.png"]} />
            <img src={images["character_select/Luigi.png"]} />
            <img src={images["character_select/Peach.png"]} />
            <img src={images["character_select/Yoshi.png"]} />
            <img src={images["character_select/DK.png"]} />
            <img src={images["character_select/C.Falcon.png"]} />
            <img src={images["character_select/Ganondorf.png"]} />
          </div>
        </div>
        <div className="row">
          <img src={images["character_select/Falco.png"]} />
          <img src={images["character_select/Fox.png"]} />
          <img src={images["character_select/Ice Climber.png"]} />
          <img src={images["character_select/Samus.png"]} />
          <img src={images["character_select/Zelda.png"]} />
        </div>
        <div className="row">There!</div>*/}
      </div>
    );
  }
}
export default CharacterSelect;
