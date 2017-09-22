import React, {Component} from 'react';
import Link from 'react-router-dom';
import {connect} from 'react-redux';
import {getStickyVideo} from '../../actions';

class StickYt extends Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log('this is props: IN STICKY ', this.props.yt_url);
    return(
      <h1>Hello</h1>
    )
  }
}
function mapStateToProps(state){
  return{
    yt_url: state.features.yt_url
  }
}
export default connect(mapStateToProps, { getStickyVideo })(StickYt);
