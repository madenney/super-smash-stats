import React from 'react';
import './mergeintostylish.css';
import {Link} from 'react-router-dom';
import SmashIcon from './imgs/SmashBrosSymbol.svg';

const Navbar = () => {


    return(
        <div className="navigation">
            <Link to="/">
                <div className="navItem">
                    <a href="/" className="homeIcon"><img src={SmashIcon} /></a>
                </div>
            </Link>
            <div className="navItem">
                 <a href="#">ABOUT</a>
            </div>
        </div>
    )

};

export default Navbar;