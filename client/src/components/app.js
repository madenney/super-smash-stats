import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './navbar';
import Landing from './landing';
import About from './about';
import SearchResults from './search_results';
import PlayerProfile from './player_profile';
import Pagination from './pagination';

export default () => (
  <div>
    <Route component = {Navbar}/>
    <Route exact path="/" component={Landing}/>
    <Route path='/results/:search/:id' component={SearchResults}/>
    <Route path='/player_profile/:id' component = {PlayerProfile}/>
      <Route path='/about' component={About}/>
  </div>
)
