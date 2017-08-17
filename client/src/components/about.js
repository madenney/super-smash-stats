import React from 'react';
import './stylish.css';
import Matt from './imgs/developer_pics/matt.jpg';
import Howard from './imgs/developer_pics/hun.jpg';
import David from './imgs/developer_pics/david.jpg';
import Adam from './imgs/developer_pics/adam.jpg';


const About = () => {
    return (
        <div className="container fromDarkness">
            <h1> About Us </h1>
            <div className="description" >
                SmashStats is brought to you by a group of Smash Players and competitive gaming afficionados. We're looking to make any and all data related to the Smash scene readily available for everyone. #Meleeislife.
            </div>
            <div className="card-row">
                <div className="card">
                    <img className="card-img-top" src={Matt}/>
                    <div className="after">Matt "Mad Matt" Denney</div>
                </div>
                <div className="card">
                    <img className="card-img-top" src='http://www.ikea.com/PIAimages/0445780_PE596064_S5.JPG'/>
                    <div className="after">Howard "Hoon" Kim</div>
                </div>
                <div className="card">
                    <img className="card-img-top" src="http://vignette2.wikia.nocookie.net/onepunchman/images/0/07/Saitama_serious_profile.png/revision/latest?cb=20161002154538"/>
                    <span className="after">Khanh Nguyen</span>
                </div>
                <br/>
                <div className="card">
                    <img className="card-img-top" src={David}/>
                    <div className="after">David Sung</div>
                </div>
                <div className="card">
                    <img className="card-img-top" src={Adam}/>
                    <div className="after">Adam Luong</div>
                </div>
            </div>
        </div>
    )
};

export default About;
