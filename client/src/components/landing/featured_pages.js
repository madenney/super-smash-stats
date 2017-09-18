import React, {Component} from 'react';
import Carousel from './carousel';

class FeaturedPages extends Component {
  render(){
    return(
      <div className='container mt-5'>
        <h1>Featured Pages!</h1>
        <Carousel />
      </div>
    )
  }
}
export default FeaturedPages;
