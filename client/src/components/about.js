import React from 'react';
import './stylish.css';


const About = () => {

    return (
        <div className="container">
            <h1> About Us </h1>
            <div className="description">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
            <p></p>

            <div className="card-row">
                <div className="card">
                    <img className="card-img-top" src="http://via.placeholder.com/300.png/09f/fff"/>
                    <span className="name">Person 1</span>
                </div>
                <div className="card">
                    <img className="card-img-top" src="http://via.placeholder.com/300.png/09f/fff"/>
                    <span className="name">Person 2</span>
                </div>
                <div className="card">
                    <img className="card-img-top" src="http://via.placeholder.com/300.png/09f/fff"/>
                    <span className="name">Person 3</span>
                </div>
                <div className="card">
                    <img className="card-img-top" src="http://via.placeholder.com/300.png/09f/fff"/>
                    <span className="name">Person 4</span>
                </div>
                <div className="card">
                    <img className="card-img-top" src="http://via.placeholder.com/300.png/09f/fff"/>
                    <span className="name">Person 5</span>
                </div>
            </div>

        </div>
    )
};

export default About;