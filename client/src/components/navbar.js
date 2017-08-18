import React from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';
import SmashIcon from './imgs/website_logo.svg';
const Navbar = () => {
    const ulStyle = {
      width: '80%'
    };
    return(
      <nav className='navbar navbar-inverse bg-inverse navbar-static-top navbar-toggleable'>
          <Link to="/" className="navbar-brand homeIcon">
            <img src={SmashIcon} />
          </Link>
          <ul className='nav nav-justified mx-auto' style={ulStyle} >
            <li className='nav-item nav-link'>
              <Link to='/'>
                  <div className="navButtonBorder">
                      <div className='navButton'>
                          Home
                      </div>
                  </div>
              </Link>
            </li>
            <li className='nav-item nav-link'>
              <Link to='/characterselect'>
                  <div className="navButtonBorder">
                      <div className='navButton'>
                          Character Select
                      </div>
                  </div>
              </Link>
            </li>
            <li className='nav-item nav-link'>
              <Link to='/results/noSearch/1'>
                  <div className="navButtonBorder">
                      <div className='navButton'>
                          Top Players
                      </div>
                  </div>
              </Link>
            </li>
            <li className='nav-item nav-link'>
              <Link to='/faq'>
                  <div className="navButtonBorder">
                      <div className='navButton'>
                          FAQ
                      </div>
                  </div>
              </Link>
            </li>
            <li className='nav-item nav-link'>
              <Link to='/about'>
                  <div className="navButtonBorder">
                      <div className='navButton'>
                          About
                      </div>
                  </div>
              </Link>
            </li>
          </ul>
          {/* <NavBarSearch /> */}
      </nav>
    )

};

export default Navbar;
