import React, { Component } from 'react';
import Searchbar from './searchbar';
import Carousel from './playercardcarousel';
import './stylish.css';

export default class Landingpage extends Component {

    render() {

        return (
            <div className="landing">
                <Searchbar />
                <Carousel />
            </div>
        )
    }
}