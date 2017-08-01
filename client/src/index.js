import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
    <div>
        <Router>
            <App />
        </Router>
    </div>,
    document.getElementById('root')
);
