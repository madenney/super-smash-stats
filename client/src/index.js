import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Landingpage from './components/landing';

ReactDOM.render(
    <Router>
      <Landingpage />
    </Router>,
    document.getElementById('root')
);
