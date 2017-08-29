import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import App from './components/app';

ReactDOM.render(
    <div>
        <Favicon url='https://vignette3.wikia.nocookie.net/ssb/images/6/64/Favicon.ico/revision/latest?cb=20150114084035' />
        <Router>
            <App />
        </Router>
    </div>,
    document.getElementById('root')
);
