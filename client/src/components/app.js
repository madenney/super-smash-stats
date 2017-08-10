import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './navbar';
import Landing from './landing';
import About from './about';
import SearchResults from './search_results';
import PlayerProfile from './player_profile';
import Head2HeadResults from './head2head_results';
import Head2HeadProfile from './head2head_profile';
import Pagination from './pagination';

export default () => (
    <div>
        <Route component = {Navbar}/>
        <Route exact path="/" component={Landing}/>
        <Route path='/results/:search/:page' component={SearchResults}/>
        <Route path='/player_profile/:id' component = {PlayerProfile}/>
        <Route path="/head2headresults/:id/:search/:page" component = {Head2HeadResults}/>
        <Route path="/head2headprofile/:id1/:id2" component = {Head2HeadProfile}/>
        <Route path='/about' component={About}/>
    </div>
)

