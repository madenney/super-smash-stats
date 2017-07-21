import React from 'react';
import './app.css';
import smashBall from './imgs/SmashBrosSymbol.svg';

const App = () => (
    <div>
        <div className="app">
            <img src={smashBall} className="rotate"/>
            <h1>Smash Bros!</h1>
        </div>
    </div>
);

export default App;
