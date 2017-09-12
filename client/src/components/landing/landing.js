import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import Scroll from 'react-scroll';
import { scroller } from 'react-scroll';
import Searchbar from "./searchbar";
import FeaturedPages from './featured_pages';
import landingPageLogo from "../imgs/land_logo.png";
import '../css/font-awesome.css';
import "../css/landing_page.css";
let scroll = Scroll.animateScroll;
export default class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            autocomCards: [],
            cards: ""
        };
    }
    scrollToBottom(){
      // const {container_position} = this.state;
      scroll.scrollToBottom({
        smooth: true,
        offset: 50,
        isDynamic: true
      });
    }
    render() {
        return (
            <div className="landingPage landingPage--darkness">
                <div className="container container--searchbar">
                    <div className="landingPage-logo row col-md-8 mx-auto">
                        <div className="text-center">
                            <img
                                src={landingPageLogo}
                                className="d-block mx-auto"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <Searchbar history={this.props.history} />
                    </div>
                    <br />
                    <Link to="/results/top_players/1">
                        <p className="text--blink text-center">
                            SEARCH THE DATABASE
                        </p>
                    </Link>
                    <div className='row'>
                    <i onClick = {()=>this.scrollToBottom()} className='fa fa-chevron-circle-down fa-4x animated bounce' aria-hidden = 'true'></i>
                    </div>
                </div>
                <div className='container container--featured-players'>
                  <FeaturedPages />
                </div>
            </div>
        );
    }
}
