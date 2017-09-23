import React, {Component} from 'react';
import Link from 'react-router-dom';
import {connect} from 'react-redux';
import {getStickyVideo} from '../../actions';
import '../css/sticky_yt.css';
class StickYt extends Component {
  constructor(props){
    super(props);
    this.noVideo = this.noVideo.bind(this);
  }
  noVideo(){
    this.props.getStickyVideo('');
  }

  componentWillReceiveProps(nextProps){
    console.log('CURRENT:', this.props, 'NEXT:', nextProps);
  }

  render(){
    const {yt_url} = this.props;
    if(yt_url === null){
      return null;
    }
    else{
      const styles = {
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        width: '250px',
        zIndex: '1100'
      }
      return(
        <div>
          <iframe style={styles} className='yt-frame mx-auto animated fadeInRightBig' id='featured-video' frameBorder='0' allowFullScreen='allowfullscreen' src={yt_url}></iframe>
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  return{
    yt_url: state.features.yt_url
  }
}
export default connect(mapStateToProps, { getStickyVideo })(StickYt);
