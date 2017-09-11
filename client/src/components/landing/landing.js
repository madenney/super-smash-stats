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
            <div className="landingPage landingPage--darkness">
                <div className="container">
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
                    <Link to="/results/noSearch/1">
                        <p className="text--blink text-center">
                            SEARCH THE DATABASE
                        </p>
                    </Link>
                </div>
            </div>
        );
    }
}
