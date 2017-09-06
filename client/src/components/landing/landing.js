import React, { Component } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./searchbar";
import landingPageLogo from "../imgs/land_logo.png";
import "../css/landing_page.css";

export default class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            autocomCards: [],
            cards: ""
        };
    }
    render() {
        return (
            <div className="landingPage--darkness">
                <div className="container landingPage--center">
                    <div className="landingPage-logo row offset-sm-2 offset-md-4 col-md-9 off-lg-4 offset-xl-3 col-12">
                        <img src={landingPageLogo} />
                    </div>
                    <div className="row row-eq-height">
                        <Searchbar history={this.props.history} />
                    </div>
                    <br />
                    <Link to="/results/noSearch/1">
                        <p className="text--blink offset-xl-6 offset-lg-6 offset-md-6 offset-sm-4 offset-2">
                            SEARCH THE DATABASE
                        </p>
                    </Link>
                </div>
            </div>
        );
    }
}
