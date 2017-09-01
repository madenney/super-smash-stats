import React, { Component } from 'react';
import Slider from 'react-slick';
// info https://github.com/akiran/react-slick
import {Link} from 'react-router-dom';
import images from '../features/img_filter';
import Playercard from './playercard';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: props.card
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('new props is', nextProps);
        this.setState({
            card: nextProps.card
        })
    }


    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2
        };
        return (
            <div className='container'>
                <Slider {...settings}>
                    <div><Playercard card={this.state.card} cardNum={0} /></div>
                    <div><Playercard card={this.state.card} cardNum={1} /></div>
                    <div><Playercard card={this.state.card} cardNum={2} /></div>
                    <div><Playercard card={this.state.card} cardNum={3} /></div>
                    <div><Playercard card={this.state.card} cardNum={4} /></div>
                    <div><Playercard card={this.state.card} cardNum={5} /></div>
                    <div><Playercard card={this.state.card} cardNum={6} /></div>
                    <div><Playercard card={this.state.card} cardNum={7} /></div>
                    <div><Playercard card={this.state.card} cardNum={8} /></div>
                    <div><Playercard card={this.state.card} cardNum={9} /></div>
                </Slider>
            </div>
        );
    }
}
export default Carousel;
