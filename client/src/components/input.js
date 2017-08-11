<<<<<<< HEAD
import React, {Component} from 'react';
import './search_bar.css';
class Input extends Component {
  constructor(props){
    super(props);
    this.state={
      value: '',
    }
  }
  componentWillMount(){
    console.log('hello');
  }
  componentWillReceiveProps(){
    console.log('this is value of props: ', this.props.value)
    if(this.props.value === ''){
      this.setState({
        value: ''
    });
    }
    else{
    this.setState({
      value: this.props.value
    })
  }
  }
  render(){
    return(
      <div className='input-group completed_text'>
        <div>{this.state.value}</div>
        <input className='form-control' type='text' onChange = {(e) => this.props.handleChange(e)} value={this.state.value} />
      </div>
    )
  }
}
export default Input;
// handleKeyInputs(e){
//       console.log('this is the key that was pressed:',e.keyCode);
//       if(e.keyCode == 32){
//         console.log('space bar was pressed');
//       }
//       else if(e.keyCode == 9){
//         e.preventDefault();
//         console.log('tab was pressed');
//       }
//       else if(e.keyCode == 13){
//         console.log('enter was pressed');
//       }
//       else if(e.keyCode == 16){
//         console.log('shift key was pressed');
//       }
//       else if(e.keyCode>=48 && e.keyCode <= 90){
//         this.setState({
//           text_filled: this.state.text_filled + e.key
//         });
//       }
//       else{
//         console.log('das not a letter silly!');
//       }
//
//       // console.log('this is the key: ', e.key);
//     }
=======
import React from 'react';

>>>>>>> 187199734d2adf0c7fdde1b96a8e2b6d7d64ae84
