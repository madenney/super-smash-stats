import React, { Component } from "react";
import { Link } from "react-router-dom";
import SmashIcon from "../imgs/website_logo.svg";
import "../css/navbar.css";
import bgimage from "../imgs/bg-galaxy.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: ""
    };
  }

  checkShow() {
    let { show } = this.state;
    this.setState({ show: show == "" ? "show" : "" });
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top navbar-toggleable navbar-z-index">
        <button
          onClick={() => this.checkShow()}
          className="navbar-toggler-icon navbar-toggler navbar-toggler-right collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#smashbar_collapse"
        >
          <span />
          <span />
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="navbar-brand home-icon">
          <img src={SmashIcon} />
        </Link>
        <div
          className={`collapse navbar-collapse ${this.state.show} mr-auto`}
          id="smashbar_collapse"
        >
          <ul className="nav navbar-nav mr-auto navbar-ul--width">
            <Link onClick={() => this.checkShow()} to="/">
              <li className="nav-item">
                <div className="nav-button nav-link">
                  Home <span className="sr-only">(current)</span>
                </div>
              </li>
            </Link>
            <Link
              onClick={() => this.checkShow()}
              to="/character_select_screen"
            >
              <li className="nav-item">
                <div className="nav-button nav-link">Character Select</div>
              </li>
            </Link>
            <Link onClick={() => this.checkShow()} to="/results/top_players/1">
              <li className="nav-item">
                <div className="nav-button nav-link">Top Players</div>
              </li>
            </Link>
            <Link onClick={() => this.checkShow()} to="/faq">
              <li className="nav-item">
                <div className="nav-button nav-link">FAQ</div>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
