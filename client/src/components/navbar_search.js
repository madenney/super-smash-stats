import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Autocomplete from './autocomplete';
class NavBarSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : '',
      autocomCards: []
    }
  }
  handleChange(e) {
      this.setState({value: e.target.value});
      if (e.target.value != '') {
          axios.post('http://localhost:3030/autocomplete', { input: e.target.value, number: 10 }).then((response) => {
              this.setState({
                  autocomCards: response.data
              });
          })
      } else {
          this.setState({
              autocomCards: []
          })
      }
  }
  clearForm(){
    this.setState({
      value: '',
      autocomCards:[]
    })
  }
  render(){
    const {value} = this.state;
    return(
          <form className='form-inline my-2 my-lg-0'>
            <input className="form-control mr-md-2" type="text" placeholder="Insert Player Name" value={value} onChange={(e) => this.handleChange(e)} />
            <Autocomplete recommendations={this.state.autocomCards} />
            <span className='input-group-btn my-2 my-sm-0'>
                <Link onClick={()=>this.clearForm()} className='btn btn-outline-warning' to={`/results/${value ? value : 'noSearch'}`}>Search</Link>
            </span>
          </form>
    )
  }
}
export default NavBarSearch;