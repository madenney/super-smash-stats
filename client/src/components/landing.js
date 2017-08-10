import React, { Component } from 'react';
import Searchbar from './searchbar';
import LandLogo from './imgs/land_logo.png';
import axios from 'axios';
import Carousel from './playercardcarousel';
import './stylish.css';

export default class Landingpage extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            autocomCards: [],
            cards: ''
        };
    }
    componentWillMount(){
        axios.post('http://localhost:3030/front_page', {number: 6}).then((response)=>{
            this.setState({
                cards: response.data
            })
        });
    }

    render() {
        return (
            <div className="landing">
                <div className ='container landingCenter'>
                    <div className='landpage_logo row offset-md-3 col-md-6 off-lg-4'>
                        <img src = {LandLogo}/>
                    </div>
                    <Searchbar />
                    {/* Row for the player cards styling */}
                    <div className='row col-md-6 offset-md-3 col-sm-9 offset-sm-1 scrollmenu'>
                        <Carousel card = {this.state.cards} />
                    </div>
                </div>
            </div>
        )
    }
}
