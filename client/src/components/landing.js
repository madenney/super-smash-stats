import React, { Component } from 'react';
import Searchbar from './searchbar';
import LandLogo from './imgs/land_logo.png';
import axios from 'axios';
import Carousel from './carousel';
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
        axios.post('http://localhost:3030/front_page', {number: 10}).then((response)=>{
            this.setState({
                cards: response.data
            })
        });
    }

    render() {
        return (
            <div className="landing fromDarkness">
                <div className ='container landingCenter'>
                    <div className='landpage_logo row offset-md-3 col-md-6 off-lg-4'>
                        <img src = {LandLogo}/>
                    </div>
                    <div className="row row-eq-height">
                        <Searchbar history={this.props.history} />
                    </div>
                    <br/>
                    <p className="blinkText">SEARCH THE DATABASE</p>
                </div>
                <div className='container character-selection-screen' id='character-selection-screen'>
                  {/* <h1>Feature Set</h1> */}
                </div>
            </div>
        )
    }
}
