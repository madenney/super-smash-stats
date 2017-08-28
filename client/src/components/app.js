import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './navbar';
import Landing from './landing';
import About from './about';
// import CharacterSelect from './characterselect';
import SearchResults from './search_results';
import PlayerProfile from './player_profile';
import Head2HeadResults from './head2head_results';
import Head2HeadProfile from './head2head_profile';
import CharacterSelect from './character_select';
import Faq from './faq';

export default () => (
    <div>
        <Route component = {Navbar}/>
        <Route exact path="/" component={Landing}/>
        <Route path="/characterselect" component={CharacterSelect}/>
        <Route path='/results/:search/:id' component={SearchResults}/>
        <Route path='/player_profile/:id' component = {PlayerProfile}/>
        <Route path="/head2headresults/:id1/:search/:page" component = {Head2HeadResults}/>
        <Route path="/head2headprofile/:id1/:id2" component = {Head2HeadProfile}/>
        <Route path="/faq" component = {Faq} />
        <Route path='/about' component={About}/>
        <Route path= '/character_select_screen' component = {CharacterSelect} />
    </div>
)
