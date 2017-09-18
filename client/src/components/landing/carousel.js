import React, { Component } from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
import images from '../features/img_filter';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: props.card
        }
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            fade: true,
            swipe: true
        };
        return (
            <div className='container'>
                <h2 className='mb-5 text-center'>First Time?</h2>
                <Slider {...settings}>
                  <div>
                    <h1>Player Profile Search</h1>
                    <img className='mx-auto' src={images['featured_gifs/player_search.gif']}/>
                  </div>
                  <div>
                    <h1>Player Search</h1>
                    <img className='mx-auto' src={images['featured_gifs/player_results.gif']}/>
                  </div>
                  <div>
                    <h1>Head 2 Head Profile Search</h1>
                    <img className='mx-auto' src={images['featured_gifs/h2h_search.gif']}/>
                  </div>
                  <div>
                    <h1>Head 2 Head Search Results</h1>
                    <img className='mx-auto' src={images['featured_gifs/h2h_results.gif']}/>
                  </div>
                </Slider>
            </div>
        );
    }
}
export default Carousel;
