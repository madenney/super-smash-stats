import React from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';
import SmashIcon from './imgs/SmashBrosSymbol.svg';
import NavBarSearch from './navbar_search';

const Navbar = () => {


    return(
      <nav className='navbar navbar-inverse bg-inverse navbar-static-top navbar-toggleable-md'>
        <Link to="/" className="navbar-brand homeIcon">
            <img src={SmashIcon} />
        </Link>
          <ul className='navbar-nav'>
            <li className='nav-item nav-link'>
              <Link to='#'>H2H</Link>
            </li>
            <li className='nav-item nav-link'>
              <Link to='/about'>About Us</Link>
            </li>
          </ul>
          <NavBarSearch />
      </nav>
    )

};

export default Navbar;
