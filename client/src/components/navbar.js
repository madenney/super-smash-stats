import React from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';
import SmashIcon from './imgs/website_logo.svg';
const Navbar = () => {
    const ulStyle = {
      width: '100%'
    };
    return(
      <nav className='navbar navbar-inverse bg-inverse navbar-static-top navbar-toggleable'>
          <button className='navbar-toggler-icon navbar-toggler navbar-toggler-right collapsed' type='button' data-toggle='collapse' data-target='#smashbar_collapse'>
            <span className='mininav'></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link to="/" className="navbar-brand homeIcon">
            <img src={SmashIcon} /> <i className='hidden-sm-down fa fa-star-o'></i>
          </Link>
          <div className='collapse navbar-collapse mr-auto' id="smashbar_collapse">
            <ul className='nav navbar-nav mr-auto' style={ulStyle} >
              <li className='nav-item nav-link'>
                <Link to='/'>
                    <div className='navButton'>
                        Home
                    </div>

                </Link>
              </li>
              <li className='nav-item nav-link'>

                <Link to='/character_select_screen'>
                        <div className='navButton'>
                          Character Select
                        </div>
                </Link>
              </li>
              <li className='nav-item nav-link'>
                <Link to='/results/noSearch/1'>
                    <div className='navButton'>
                        Top Players
                    </div>
                </Link>
              </li>
              <li className='nav-item nav-link'>
                <Link to='/faq'>
                    <div className='navButton'>
                        FAQ
                    </div>
                </Link>
              </li>
              <li className='nav-item nav-link'>
                <Link to='/about'>
                    <div className='navButton'>
                        About
                    </div>
                </Link>
              </li>
            </ul>
          </div>
          {/* <NavBarSearch /> */}
      </nav>
    )

};

export default Navbar;
