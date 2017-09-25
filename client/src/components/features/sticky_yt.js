import React, {Component} from 'react';
import Link from 'react-router-dom';
import {connect} from 'react-redux';
import {getStickyVideo, checkStickyVideo} from '../../actions';

import ReactPlayer from 'react-player';
import '../css/sticky_yt.css';

class StickYt extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_sticky: false,
      yt_controls: true,
      yt_time_elapsed: null,
      yt_url: null
    }
    this.onProgress = this.onProgress.bind(this);
    this.stickyVideoBtn = this.stickyVideoBtn.bind(this);
  }
  onProgress(yt_time){
    this.setState({
      yt_time_elapsed: yt_time.playedSeconds
    })
  }
  stickyVideoBtn(e){
    let btn_event = e.target.getAttribute('data');
    if(btn_event == 'remove'){
      console.log('we are removing bitches!');
    }
    else if(btn_event == 'restore_window'){
      console.log('we are restoring bitches!');
    }
  }
  componentWillReceiveProps(nextProps){
    const {is_sticky, yt_time_elapsed} = this.state;
    if(nextProps.sticky_yt_player === false){
      this.props.getStickyVideo(this.props.yt_url, yt_time_elapsed);
    }
  }
  render(){
    const {sticky_yt_player, yt_url} = this.props;
    const {yt_time_elapsed} = this.state;
    if(yt_url === null || sticky_yt_player === false){
      return null;
    }
    else{
      const styles = {
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        zIndex: '1100'
      }
      const remove_btn_style = {
        position: 'fixed',
        bottom: '160px',
        left: '10px',
        zIndex: '1100'
      }
      const return_btn_style = {
        position: 'fixed',
        bottom: '161px',
        left: '58px',
        zIndex: '1100'

      }
      return(
        <div>
          <button onClick={this.stickyVideoBtn} data='remove' style={remove_btn_style} className='btn btn-outline-danger'><i className='fa fa-times' aria-hidden='true'></i></button>
          <button onClick={this.stickyVideoBtn} data='restore_window' style={return_btn_style} className='btn btn-outline-primary'><i className='fa fa-window-restore' aria-hidden='true'></i></button>
          <ReactPlayer playing width='250px' height = '150px' onProgress={this.onProgress} url={yt_url.url} controls={this.state.yt_controls} style={styles}/>
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  return{
    yt_url: state.features.yt_url,
    sticky_yt_player: state.features.sticky_yt_player
  }
}
export default connect(mapStateToProps, { getStickyVideo, checkStickyVideo })(StickYt);
